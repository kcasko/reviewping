import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardClient from "./dashboard-client";

interface Props {
  searchParams: Promise<{ success?: string; canceled?: string }>;
}

export default async function DashboardPage({ searchParams }: Props) {
  const supabase = await createClient();
  const params = await searchParams;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch business
  const { data: businesses } = await supabase
    .from("businesses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (!businesses || businesses.length === 0) {
    redirect("/setup");
  }

  // Fetch recent review requests
  const { data: requests } = await supabase
    .from("review_requests")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  // Fetch subscription
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  // Fetch this month's usage
  const currentMonth = new Date().toISOString().slice(0, 7);
  const { data: usage } = await supabase
    .from("monthly_usage")
    .select("requests_sent")
    .eq("user_id", user.id)
    .eq("month", currentMonth)
    .single();

  return (
    <DashboardClient
      user={user}
      businesses={businesses}
      requests={requests || []}
      subscription={subscription}
      monthlyUsage={usage?.requests_sent || 0}
      paymentSuccess={params.success === "true"}
    />
  );
}
