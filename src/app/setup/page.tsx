"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Star, Loader2, ExternalLink, CheckCircle } from "lucide-react";

const INDUSTRIES = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Cleaning Services",
  "Landscaping",
  "Roofing",
  "Painting",
  "Pest Control",
  "Auto Repair",
  "Dentist / Medical",
  "Restaurant / Food",
  "Salon / Spa",
  "Other",
];

export default function SetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [googleLink, setGoogleLink] = useState("");
  const [yelpLink, setYelpLink] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!businessName || !googleLink) {
      setError("Business name and Google review link are required.");
      return;
    }
    setLoading(true);
    setError("");

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("businesses").insert({
      user_id: user.id,
      name: businessName,
      industry,
      google_review_link: googleLink,
      yelp_review_link: yelpLink || null,
      is_primary: true,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="h-6 w-6 text-blue-600 fill-blue-600" />
            <span className="font-bold text-xl text-gray-900">ReviewPing</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Set up your account
          </h1>
          <p className="text-gray-500 mt-1">Takes less than 5 minutes</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step > s
                    ? "bg-green-500 text-white"
                    : step === s
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > s ? <CheckCircle className="h-4 w-4" /> : s}
              </div>
              {s < 2 && <div className="w-12 h-0.5 bg-gray-200" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-semibold text-gray-900 text-lg">
                Your business info
              </h2>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ABC Plumbing"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select your industry</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => {
                  if (!businessName) {
                    setError("Please enter your business name.");
                    return;
                  }
                  setError("");
                  setStep(2);
                }}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="font-semibold text-gray-900 text-lg">
                Your review links
              </h2>
              <p className="text-sm text-gray-500">
                We&apos;ll send customers directly to these pages. Get your
                Google review link from your Google Business Profile dashboard.
              </p>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Google review link{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={googleLink}
                  onChange={(e) => setGoogleLink(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://g.page/r/your-business/review"
                />
                <a
                  href="https://support.google.com/business/answer/7035772"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1"
                >
                  How to get your Google review link
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Yelp review link{" "}
                  <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="url"
                  value={yelpLink}
                  onChange={(e) => setYelpLink(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://yelp.com/biz/your-business"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? "Setting up..." : "Go to dashboard"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
