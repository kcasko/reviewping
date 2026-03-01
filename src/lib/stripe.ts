import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-02-24.acacia",
    });
  }
  return _stripe;
}

// Keep a named export for backwards compat but use lazy getter
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const PLANS = {
  starter: {
    name: "Starter",
    get priceId() {
      return process.env.STRIPE_PRICE_STARTER!;
    },
    price: 29,
    requests: 100,
    features: [
      "100 SMS review requests/month",
      "Google, Yelp & Facebook reviews",
      "Email + SMS sending",
      "Review link dashboard",
      "Basic analytics",
    ],
  },
  pro: {
    name: "Pro",
    get priceId() {
      return process.env.STRIPE_PRICE_PRO!;
    },
    price: 79,
    requests: -1, // unlimited
    features: [
      "Unlimited review requests",
      "All platforms supported",
      "Multi-location support",
      "Custom SMS templates",
      "Advanced analytics",
      "Priority support",
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;
