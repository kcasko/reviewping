import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { sendReviewSMS } from "@/lib/twilio";
import { z } from "zod";

const SendSchema = z.object({
  businessId: z.string().uuid(),
  customerName: z.string().min(1).max(100),
  customerPhone: z.string().min(10),
  customerEmail: z.string().email().optional().nullable(),
  channel: z.enum(["sms", "email", "both"]).default("sms"),
  platform: z.enum(["google", "yelp", "facebook"]).default("google"),
});

export async function POST(req: Request) {
  const supabase = await createClient();

  // Auth check
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = SendSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0].message },
      { status: 400 }
    );
  }

  const { businessId, customerName, customerPhone, customerEmail, channel, platform } =
    parsed.data;

  // Check the business belongs to this user
  const { data: business, error: bizError } = await supabase
    .from("businesses")
    .select("id, name, google_review_link, yelp_review_link")
    .eq("id", businessId)
    .eq("user_id", user.id)
    .single();

  if (bizError || !business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  // Check monthly usage limit
  const currentMonth = new Date().toISOString().slice(0, 7);
  const { data: usage } = await supabase
    .from("monthly_usage")
    .select("requests_sent")
    .eq("user_id", user.id)
    .eq("month", currentMonth)
    .single();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("plan")
    .eq("user_id", user.id)
    .single();

  const isPro = subscription?.plan === "pro";
  const monthlyCount = usage?.requests_sent || 0;

  if (!isPro && monthlyCount >= 100) {
    return NextResponse.json(
      {
        error:
          "Monthly limit of 100 requests reached. Upgrade to Pro for unlimited.",
      },
      { status: 429 }
    );
  }

  // Get review link
  const reviewLink =
    platform === "yelp"
      ? business.yelp_review_link || business.google_review_link
      : business.google_review_link;

  if (!reviewLink) {
    return NextResponse.json(
      { error: "No review link configured for this platform." },
      { status: 400 }
    );
  }

  // Send SMS
  let twilioSid: string | undefined;
  let status: "sent" | "failed" = "sent";

  if (channel === "sms" || channel === "both") {
    const result = await sendReviewSMS({
      to: customerPhone,
      customerName,
      businessName: business.name,
      reviewLink,
    });

    if (result.success) {
      twilioSid = result.sid;
    } else {
      status = "failed";
    }
  }

  // Use service client to insert (bypasses RLS for insert from server)
  const serviceSupabase = await createServiceClient();

  // Record the request
  const { data: request, error: insertError } = await serviceSupabase
    .from("review_requests")
    .insert({
      business_id: businessId,
      user_id: user.id,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail || null,
      platform,
      channel,
      status,
      twilio_sid: twilioSid || null,
      sent_at: status === "sent" ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (insertError) {
    console.error("Insert error:", insertError);
    return NextResponse.json(
      { error: "Failed to record request" },
      { status: 500 }
    );
  }

  // Increment monthly usage
  await serviceSupabase.rpc("increment_monthly_usage", { p_user_id: user.id });

  return NextResponse.json({ success: true, request });
}
