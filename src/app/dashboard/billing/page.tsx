"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Loader2, Star } from "lucide-react";
import { PLANS_UI } from "@/lib/plans";

export default function BillingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleUpgrade(plan: "starter" | "pro") {
    setLoading(plan);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Failed to start checkout");
        setLoading(null);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(null);
    }
  }

  async function handleManage() {
    setLoading("portal");
    setError("");
    try {
      const res = await fetch("/api/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "No active subscription found");
        setLoading(null);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Plans & Billing
        </h1>
        <p className="text-gray-500 mb-8">
          Upgrade to send unlimited review requests and unlock all features.
        </p>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {(["starter", "pro"] as const).map((key) => {
            const plan = PLANS_UI[key];
            return (
              <div
                key={key}
                className={`bg-white rounded-2xl border-2 p-6 ${
                  plan.highlight ? "border-blue-600" : "border-gray-200"
                }`}
              >
                {plan.badge && (
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">
                    {plan.badge}
                  </div>
                )}
                <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-500 mb-5">
                  {plan.requests === -1
                    ? "Unlimited requests"
                    : `${plan.requests} requests/month`}
                </p>
                <button
                  onClick={() => handleUpgrade(key)}
                  disabled={!!loading}
                  className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-colors mb-5 flex items-center justify-center gap-2 disabled:opacity-60 ${
                    plan.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-900 text-white hover:bg-gray-700"
                  }`}
                >
                  {loading === key ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Star className="h-4 w-4" />
                  )}
                  {loading === key ? "Redirecting..." : "Start 14-day free trial"}
                </button>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-2">
            Already subscribed?
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            Manage your subscription, update payment method, or cancel anytime.
            No phone calls needed.
          </p>
          <button
            onClick={handleManage}
            disabled={!!loading}
            className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:underline disabled:opacity-60"
          >
            {loading === "portal" && (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            )}
            Open billing portal →
          </button>
        </div>
      </div>
    </div>
  );
}
