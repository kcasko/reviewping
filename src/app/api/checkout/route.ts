import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { stripe, PLANS, type PlanKey } from "@/lib/stripe";

export async function POST(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { plan } = await req.json() as { plan: PlanKey };

  if (!PLANS[plan]) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const selectedPlan = PLANS[plan];
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

  // Check for existing Stripe customer
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: selectedPlan.priceId,
        quantity: 1,
      },
    ],
    success_url: `${appUrl}/dashboard?success=true`,
    cancel_url: `${appUrl}/dashboard/billing`,
    customer: subscription?.stripe_customer_id || undefined,
    customer_email: !subscription?.stripe_customer_id ? user.email! : undefined,
    client_reference_id: user.id,
    subscription_data: {
      trial_period_days: 14,
      metadata: {
        user_id: user.id,
        plan,
      },
    },
  });

  return NextResponse.json({ url: session.url });
}
