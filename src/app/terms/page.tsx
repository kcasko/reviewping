import Link from "next/link";
import { Star } from "lucide-react";

export const metadata = {
  title: "Terms of Service — ReviewPing",
};

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Terms of Service
        </h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: {lastUpdated}</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By using ReviewPing, you agree to these Terms of Service. If you do
              not agree, do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. Description of Service
            </h2>
            <p>
              ReviewPing is a software-as-a-service platform that enables
              businesses to send automated SMS and email review requests to their
              customers. The service includes a dashboard for managing requests,
              tracking delivery, and monitoring review activity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. Acceptable Use
            </h2>
            <p>You agree to use ReviewPing only to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>
                Send review requests to customers who have done business with you
              </li>
              <li>Request genuine, unbiased reviews</li>
              <li>
                Comply with all applicable laws, including the TCPA, CAN-SPAM Act,
                and GDPR where applicable
              </li>
              <li>
                Include opt-out instructions in all SMS messages (automatically
                included by ReviewPing)
              </li>
            </ul>
            <p className="mt-2">You agree NOT to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>
                Send review requests to individuals who have not done business with
                you
              </li>
              <li>Offer incentives for positive reviews (violates Google ToS)</li>
              <li>Use the service to send spam or unsolicited messages</li>
              <li>
                Send messages to customers who have opted out
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Billing
            </h2>
            <p>
              ReviewPing offers monthly subscription plans. You will be billed at
              the start of each billing cycle. All plans include a 14-day free
              trial with no credit card required to start. You may cancel at any
              time; your access continues until the end of the current billing
              period. No refunds are issued for partial months.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Limitation of Liability
            </h2>
            <p>
              ReviewPing is provided &quot;as is.&quot; We do not guarantee SMS
              delivery rates, review outcomes, or specific business results. Our
              liability is limited to the amount you paid us in the 3 months prior
              to any claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              6. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              these terms, without notice. You may cancel your account at any time
              from your billing settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              7. Contact
            </h2>
            <p>
              Questions? Email{" "}
              <a
                href="mailto:hello@reviewping.com"
                className="text-blue-600 hover:underline"
              >
                hello@reviewping.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
