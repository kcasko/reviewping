import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReviewPing — Get More Google Reviews on Autopilot",
  description:
    "Send automated review requests via SMS after every job. Get more 5-star Google reviews without the $400/month price tag. Start free, no credit card required.",
  keywords:
    "google reviews, review automation, review requests, small business reviews, get more reviews",
  openGraph: {
    title: "ReviewPing — Get More Google Reviews on Autopilot",
    description:
      "Send automated SMS review requests after every job. Fraction of the cost of Birdeye or Podium.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
