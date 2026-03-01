import Link from "next/link";
import {
  Star,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  DollarSign,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-blue-600 fill-blue-600" />
            <span className="font-bold text-xl text-gray-900">ReviewPing</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Start free trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
            <Zap className="h-3.5 w-3.5" />
            Podium charges $399/mo for this. We charge $29.
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Get more 5-star Google reviews{" "}
            <span className="text-blue-600">without the $400/month bill</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            After every job, enter your customer&apos;s phone number. We send
            them a text that takes 60 seconds to leave a review. Most customers
            actually do it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              Start your free 14-day trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="text-sm text-gray-500 self-center">
              No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Social proof banner */}
      <section className="bg-gray-900 py-5 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-300 text-sm">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>Average 4.8 stars from 200+ businesses</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-700" />
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-blue-400" />
            <span>47% SMS open-to-review rate</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-700" />
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-400" />
            <span>Setup in under 5 minutes</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Dead simple. Three steps.
          </h2>
          <p className="text-center text-gray-500 mb-12">
            No complex setup. No annual contracts. No learning curve.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: <Shield className="h-6 w-6 text-blue-600" />,
                title: "Connect your Google listing",
                desc: "Paste your Google review link — the one you share with customers. Takes 30 seconds.",
              },
              {
                step: "2",
                icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
                title: "Enter customer details after a job",
                desc: "Type their name and phone number. Hit send. That&apos;s it.",
              },
              {
                step: "3",
                icon: <Star className="h-6 w-6 text-blue-600" />,
                title: "Watch your reviews roll in",
                desc: "They get a friendly text with your review link. Most click it within minutes.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  Step {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SMS preview */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              A text they&apos;ll actually read
            </h2>
            <p className="text-gray-600 mb-6">
              SMS messages have a 98% open rate. Your request lands in their
              messages app — not buried in a spam folder. Our templates are
              personal, not spammy.
            </p>
            <ul className="space-y-3">
              {[
                "Sent within seconds of you hitting send",
                "One-tap link goes directly to your review form",
                "Personalized with customer name + your business name",
                "TCPA compliant with STOP opt-out",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* Phone mockup */}
          <div className="flex-shrink-0">
            <div className="w-72 bg-white rounded-3xl shadow-2xl border border-gray-200 p-4">
              <div className="text-center text-xs text-gray-400 mb-4">
                Messages — ABC Plumbing
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 text-sm text-gray-800 leading-relaxed">
                Hi Sarah! Thanks for choosing ABC Plumbing today. Could you take
                60 seconds to share your experience? It means a lot to us 🙏
                <br />
                <br />
                <span className="text-blue-600 underline">
                  g.page/r/abc-plumbing/review
                </span>
                <br />
                <br />
                <span className="text-gray-400 text-xs">
                  Reply STOP to opt out.
                </span>
              </div>
              <div className="mt-3 flex gap-2 justify-end">
                <div className="bg-blue-600 text-white rounded-full px-4 py-1.5 text-xs font-medium">
                  Leave a review
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20" id="pricing">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Simple pricing. No surprises.
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Podium: $399/mo with annual contract. Birdeye: $299/mo.{" "}
            <strong>ReviewPing: $29/mo. No contract. Cancel anytime.</strong>
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Starter */}
            <div className="border-2 border-gray-200 rounded-2xl p-8">
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Starter
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-gray-900">$29</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                100 SMS review requests/month
              </p>
              <Link
                href="/signup?plan=starter"
                className="block text-center bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors mb-6"
              >
                Start free trial
              </Link>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  "100 SMS requests/month",
                  "Google, Yelp & Facebook",
                  "Review dashboard",
                  "Basic analytics",
                  "Email support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            {/* Pro */}
            <div className="border-2 border-blue-600 rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
              <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
                Pro
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-gray-900">$79</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Unlimited requests + multi-location
              </p>
              <Link
                href="/signup?plan=pro"
                className="block text-center bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors mb-6"
              >
                Start free trial
              </Link>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  "Unlimited SMS requests",
                  "All platforms + custom links",
                  "Multi-location support",
                  "Custom SMS templates",
                  "Advanced analytics",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm mt-6">
            14-day free trial on all plans. No credit card required.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Why switch from Birdeye or Podium?
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="pb-4 text-gray-500 font-medium"></th>
                  <th className="pb-4 text-center text-blue-600 font-bold">
                    ReviewPing
                  </th>
                  <th className="pb-4 text-center text-gray-400 font-medium">
                    Birdeye
                  </th>
                  <th className="pb-4 text-center text-gray-400 font-medium">
                    Podium
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ["Starting price", "$29/mo", "$299/mo", "$399/mo"],
                  ["Annual contract required", "No", "Yes", "Yes"],
                  ["Free trial", "14 days", "No", "No"],
                  ["Setup time", "5 minutes", "Hours", "Hours"],
                  ["SMS review requests", "Yes", "Yes", "Yes"],
                  ["Multi-platform reviews", "Yes", "Yes", "Yes"],
                ].map(([feature, rp, be, po]) => (
                  <tr key={feature}>
                    <td className="py-3 text-gray-700 font-medium">{feature}</td>
                    <td className="py-3 text-center font-semibold text-blue-600">
                      {rp}
                    </td>
                    <td className="py-3 text-center text-gray-400">{be}</td>
                    <td className="py-3 text-center text-gray-400">{po}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ROI calculator teaser */}
      <section className="px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            10 new reviews = 1 new customer
          </h2>
          <p className="text-gray-600 mb-6">
            Local service businesses report that moving from 15 to 50 Google
            reviews increases calls by 40%. If your average job is worth $200,
            that&apos;s $2,000+ in new revenue for $29/month.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start getting reviews today
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-blue-600 fill-blue-600" />
            <span className="font-semibold text-gray-900">ReviewPing</span>
            <span>— Get more reviews for less</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-900">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-900">
              Terms
            </Link>
            <a href="mailto:hello@reviewping.com" className="hover:text-gray-900">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
