// Client-safe plan data — no server imports, no env vars
// Used by client components (billing page, pricing sections)

export const PLANS_UI = {
  starter: {
    key: "starter" as const,
    name: "Starter",
    price: 29,
    requests: 100,
    badge: null,
    highlight: false,
    features: [
      "100 SMS requests/month",
      "Google, Yelp & Facebook",
      "Review dashboard",
      "Basic analytics",
      "Email support",
    ],
  },
  pro: {
    key: "pro" as const,
    name: "Pro",
    price: 79,
    requests: -1,
    badge: "MOST POPULAR",
    highlight: true,
    features: [
      "Unlimited SMS requests",
      "All platforms + custom links",
      "Multi-location support",
      "Custom SMS templates",
      "Advanced analytics",
      "Priority support",
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS_UI;
