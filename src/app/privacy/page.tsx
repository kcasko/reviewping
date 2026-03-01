import Link from "next/link";
import { Star } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — ReviewPing",
};

export default function PrivacyPage() {
  const lastUpdated = "February 1, 2026";

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4">
        <Link href="/" className="inline-flex items-center gap-2">
          <Star className="h-5 w-5 text-blue-600 fill-blue-600" />
          <span className="font-bold text-gray-900">ReviewPing</span>
        </Link>
      </nav>
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: {lastUpdated}</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide when you create an account (name,
              email, password), set up your business (business name, review links,
              industry), and send review requests (customer names, phone numbers).
            </p>
            <p className="mt-2">
              We also collect usage data automatically, including pages visited,
              features used, and SMS sending records. We use Stripe for payment
              processing — we do not store your credit card information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide and operate the ReviewPing service</li>
              <li>To send SMS review requests on your behalf via Twilio</li>
              <li>To process payments via Stripe</li>
              <li>To send transactional emails (account updates, billing)</li>
              <li>To improve our product and fix bugs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. Customer Data (Your Customers&apos; Phone Numbers)
            </h2>
            <p>
              When you enter a customer&apos;s phone number to send a review
              request, that number is stored in our database to track the status
              of the request. We do not sell this data, share it with third
              parties (except Twilio for SMS delivery), or use it for any purpose
              other than sending the review request you initiated.
            </p>
            <p className="mt-2">
              You are responsible for ensuring you have proper consent from your
              customers before sending them SMS messages. All outgoing messages
              include a &quot;Reply STOP to opt out&quot; instruction per TCPA
              requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Data Retention
            </h2>
            <p>
              We retain your account data for as long as your account is active.
              If you cancel your account, your data is deleted within 30 days upon
              request. Review request records are kept for 12 months to provide
              analytics.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Third-Party Services
            </h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>
                <strong>Supabase</strong> — database and authentication hosting
              </li>
              <li>
                <strong>Twilio</strong> — SMS delivery
              </li>
              <li>
                <strong>Stripe</strong> — payment processing
              </li>
              <li>
                <strong>Vercel</strong> — application hosting
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              6. Contact
            </h2>
            <p>
              If you have questions about this policy, email us at{" "}
              <a
                href="mailto:privacy@reviewping.com"
                className="text-blue-600 hover:underline"
              >
                privacy@reviewping.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
