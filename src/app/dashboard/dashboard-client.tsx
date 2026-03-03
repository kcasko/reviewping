"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star,
  Send,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  MessageSquare,
  TrendingUp,
  Loader2,
  ChevronDown,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";

interface Business {
  id: string;
  name: string;
  google_review_link: string;
  yelp_review_link?: string;
  industry?: string;
}

interface ReviewRequest {
  id: string;
  customer_name: string;
  customer_phone?: string;
  customer_email?: string;
  platform: string;
  channel: string;
  status: string;
  created_at: string;
}

interface Subscription {
  plan: string;
  status: string;
  trial_ends_at?: string;
}

interface Props {
  user: User;
  businesses: Business[];
  requests: ReviewRequest[];
  subscription: Subscription | null;
  monthlyUsage: number;
  paymentSuccess?: boolean;
}

export default function DashboardClient({
  user,
  businesses,
  requests,
  subscription,
  monthlyUsage,
  paymentSuccess = false,
}: Props) {
  const router = useRouter();
  const [showSuccessBanner, setShowSuccessBanner] = useState(paymentSuccess);
  const [activeTab, setActiveTab] = useState<"send" | "history" | "settings">(
    "send"
  );
  const [selectedBusiness, setSelectedBusiness] = useState(businesses[0]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [channel, setChannel] = useState<"sms" | "email">("sms");
  const [platform, setPlatform] = useState<"google" | "yelp">("google");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [localRequests, setLocalRequests] = useState<ReviewRequest[]>(requests);

  const plan = subscription?.plan || "trial";
  const isPro = plan === "pro";
  const isTrialing = subscription?.status === "trialing" || !subscription;
  const requestLimit = isPro ? Infinity : 100;
  const usagePercent = isPro ? 0 : Math.min((monthlyUsage / 100) * 100, 100);

  // Days remaining in trial
  const trialDaysLeft = (() => {
    if (!isTrialing || !subscription?.trial_ends_at) return 14;
    const msLeft =
      new Date(subscription.trial_ends_at).getTime() - Date.now();
    return Math.max(0, Math.ceil(msLeft / (1000 * 60 * 60 * 24)));
  })();

  const sentCount = localRequests.filter((r) => r.status === "sent").length;
  const thisMonthCount = localRequests.filter((r) => {
    const d = new Date(r.created_at);
    const now = new Date();
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  }).length;

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!customerName) return;
    if (channel === "sms" && !customerPhone) return;
    if (channel === "email" && !customerEmail) return;
    if (monthlyUsage >= requestLimit) {
      setSendResult({
        success: false,
        message: "Monthly limit reached. Upgrade to Pro for unlimited requests.",
      });
      return;
    }

    setSending(true);
    setSendResult(null);

    try {
      const res = await fetch("/api/send-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId: selectedBusiness.id,
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          customerEmail: customerEmail.trim() || null,
          channel,
          platform,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSendResult({
          success: true,
          message: `Review request sent to ${customerName}!`,
        });
        // Add to local list
        setLocalRequests((prev) => [data.request, ...prev]);
        // Clear form
        setCustomerName("");
        setCustomerPhone("");
        setCustomerEmail("");
      } else {
        setSendResult({ success: false, message: data.error || "Failed to send" });
      }
    } catch {
      setSendResult({ success: false, message: "Network error. Try again." });
    } finally {
      setSending(false);
    }
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  const statusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "clicked":
        return <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col fixed h-full">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-blue-600 fill-blue-600" />
            <span className="font-bold text-gray-900">ReviewPing</span>
          </div>
        </div>

        {/* Business selector */}
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 cursor-pointer">
            <div className="w-7 h-7 rounded-md bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold flex-shrink-0">
              {selectedBusiness.name.charAt(0)}
            </div>
            <span className="text-sm font-medium text-gray-800 truncate">
              {selectedBusiness.name}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-gray-400 ml-auto flex-shrink-0" />
          </div>
        </div>

        <nav className="p-3 flex-1">
          {[
            {
              id: "send" as const,
              label: "Send Request",
              icon: Send,
            },
            {
              id: "history" as const,
              label: "History",
              icon: BarChart3,
            },
            {
              id: "settings" as const,
              label: "Settings",
              icon: Settings,
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-1 ${
                activeTab === item.id
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Plan badge */}
        <div className="p-3 border-t border-gray-100">
          {!isPro && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Monthly usage</span>
                <span>
                  {monthlyUsage}/100
                </span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
            </div>
          )}
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 capitalize">{plan} plan</span>
            <Link href="/dashboard/billing" className="text-blue-600 font-medium hover:underline">
              {isPro ? "Manage" : "Upgrade"}
            </Link>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="p-3 flex items-center gap-3 text-sm text-gray-500 hover:text-gray-900 border-t border-gray-100 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </aside>

      {/* Main content */}
      <main className="ml-60 flex-1 p-8">
        {/* Payment success banner */}
        {showSuccessBanner && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-green-800 text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
              You&apos;re all set! Your subscription is now active. Start sending
              review requests below.
            </div>
            <button
              onClick={() => setShowSuccessBanner(false)}
              className="text-green-600 hover:text-green-800 ml-4 flex-shrink-0 text-lg leading-none"
            >
              ×
            </button>
          </div>
        )}

        {/* Trial expiry warning */}
        {isTrialing && !showSuccessBanner && trialDaysLeft <= 5 && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center justify-between">
            <div className="text-amber-800 text-sm">
              <span className="font-semibold">
                {trialDaysLeft === 0
                  ? "Your trial has expired."
                  : `${trialDaysLeft} day${trialDaysLeft === 1 ? "" : "s"} left in your trial.`}
              </span>{" "}
              Add a payment method to keep sending review requests.
            </div>
            <Link
              href="/dashboard/billing"
              className="ml-4 flex-shrink-0 bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Upgrade now
            </Link>
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Sent this month",
              value: thisMonthCount,
              icon: MessageSquare,
              color: "text-blue-600 bg-blue-50",
            },
            {
              label: "Total sent",
              value: sentCount,
              icon: Send,
              color: "text-green-600 bg-green-50",
            },
            {
              label: "Delivery rate",
              value:
                localRequests.length > 0
                  ? `${Math.round(
                      (sentCount / localRequests.length) * 100
                    )}%`
                  : "—",
              icon: TrendingUp,
              color: "text-purple-600 bg-purple-50",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Send Request Tab */}
        {activeTab === "send" && (
          <div className="max-w-lg">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 text-lg mb-5">
                Send a review request
              </h2>
              {sendResult && (
                <div
                  className={`mb-4 p-3 rounded-lg text-sm flex items-center gap-2 ${
                    sendResult.success
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {sendResult.success ? (
                    <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 flex-shrink-0" />
                  )}
                  {sendResult.message}
                </div>
              )}
              <form onSubmit={handleSend} className="space-y-4">
                {/* Channel toggle */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Send via
                  </label>
                  <div className="flex gap-2">
                    {(["sms", "email"] as const).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setChannel(c)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                          channel === c
                            ? "bg-blue-50 border-blue-300 text-blue-700"
                            : "border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {c === "sms" ? "📱 SMS" : "✉️ Email"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Jane Smith"
                  />
                </div>
                {channel === "sms" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                )}
                {channel === "email" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="customer@example.com"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Platform
                  </label>
                  <div className="flex gap-2">
                    {(["google", "yelp"] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPlatform(p)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors capitalize ${
                          platform === p
                            ? "bg-blue-50 border-blue-300 text-blue-700"
                            : "border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {p === "google" ? "Google" : "Yelp"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
                  <p className="font-medium text-gray-700 mb-1">Preview:</p>
                  <p className="text-xs leading-relaxed">
                    {channel === "email"
                      ? `Subject: How was your experience with ${selectedBusiness.name}? — "Hi ${customerName || "[Name]"}, thank you for choosing ${selectedBusiness.name}..."`
                      : `"Hi ${customerName || "[Name]"}! Thanks for choosing ${selectedBusiness.name} today. Could you take 60 seconds to share your experience? ${selectedBusiness.google_review_link || "[review link]"}"`
                    }
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={sending || !customerName || (channel === "sms" && !customerPhone) || (channel === "email" && !customerEmail)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send review request
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 text-lg">
                Request history
              </h2>
              <span className="text-sm text-gray-500">
                {localRequests.length} total
              </span>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {localRequests.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <MessageSquare className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                  <p className="font-medium">No requests sent yet</p>
                  <p className="text-sm mt-1">
                    Send your first review request to get started
                  </p>
                  <button
                    onClick={() => setActiveTab("send")}
                    className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Send first request
                  </button>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 text-gray-500 font-medium">
                        Customer
                      </th>
                      <th className="text-left px-4 py-3 text-gray-500 font-medium">
                        Phone
                      </th>
                      <th className="text-left px-4 py-3 text-gray-500 font-medium">
                        Platform
                      </th>
                      <th className="text-left px-4 py-3 text-gray-500 font-medium">
                        Status
                      </th>
                      <th className="text-left px-4 py-3 text-gray-500 font-medium">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {localRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {req.customer_name}
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                          {req.customer_phone || "—"}
                        </td>
                        <td className="px-4 py-3 capitalize text-gray-600">
                          {req.platform}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5 capitalize">
                            {statusIcon(req.status)}
                            <span
                              className={
                                req.status === "sent"
                                  ? "text-green-700"
                                  : req.status === "failed"
                                  ? "text-red-700"
                                  : req.status === "clicked"
                                  ? "text-yellow-700"
                                  : "text-gray-500"
                              }
                            >
                              {req.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                          {formatDate(req.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="max-w-lg space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 text-lg mb-4">
                Business settings
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Business name</span>
                  <span className="font-medium text-gray-900">
                    {selectedBusiness.name}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Industry</span>
                  <span className="text-gray-900">
                    {selectedBusiness.industry || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-500">Google review link</span>
                  <a
                    href={selectedBusiness.google_review_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate max-w-[200px]"
                  >
                    View link
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 text-lg mb-4">
                Account
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Email</span>
                  <span className="text-gray-900">{user.email}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-500">Plan</span>
                  <div className="flex items-center gap-2">
                    <span className="capitalize text-gray-900">{plan}</span>
                    <Link
                      href="/dashboard/billing"
                      className="text-blue-600 text-xs font-medium hover:underline"
                    >
                      {isPro ? "Manage" : "Upgrade to Pro →"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
