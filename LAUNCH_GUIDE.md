# ReviewPing — Launch Guide

## What You've Built

A micro-SaaS that helps local service businesses (plumbers, electricians, cleaners,
dentists, landscapers) get more Google reviews via automated SMS.

**Why it will make money:**
- Birdeye costs $299-$449/month with annual contracts
- Podium costs $399/month with annual contracts
- You charge $29/month, no contract, cancel anytime
- 33 articles exist titled "Podium alternatives" — this is a proven demand signal
- Local businesses live and die by Google reviews — this is not a "nice to have"

---

## Setup Checklist (Do These First)

### 1. Supabase Setup (Free)
1. Go to https://supabase.com — create a project
2. Go to SQL Editor → paste the contents of `supabase/schema.sql` → Run
3. Copy your project URL and anon key from Settings > API
4. Copy your service role key (keep this secret!)

### 2. Twilio Setup (~$20 to start)
1. Go to https://twilio.com — create account
2. Get a US phone number (~$1/month)
3. Copy Account SID and Auth Token
4. SMS costs ~$0.0079/message in the US
   - 100 messages = $0.79 in Twilio fees
   - You charge $29/month for 100 requests → ~97% margin on SMS costs

### 3. Stripe Setup (Free until you charge)
1. Go to https://stripe.com — create account
2. Create two products:
   - "ReviewPing Starter" — $29/month recurring
   - "ReviewPing Pro" — $79/month recurring
3. Copy the Price IDs for each
4. Set up webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Events to listen for: checkout.session.completed, customer.subscription.updated,
     customer.subscription.deleted, invoice.payment_failed

### 4. Deploy to Vercel (Free)
1. Push this repo to GitHub
2. Go to https://vercel.com → Import project
3. Add all environment variables from `.env.example`
4. Deploy — it's live in ~2 minutes

### 5. Configure `.env.local`
```bash
cp .env.example .env.local
# Fill in all values
```

---

## Launch Sequence

### Week 1: Soft Launch (Days 1-7)

**Goal:** Get 5 paying customers or committed trials

**Actions:**
1. Post in r/plumbers: "I built a tool that texts your customers after a job to get Google reviews. Way cheaper than Birdeye/Podium. Thoughts?"
2. Post in r/electricians, r/cleaningservice, r/smallbusiness with the same message
3. Post in r/SaaS: "I just launched a $29/mo alternative to Podium for review automation"
4. Find 20 local plumbers/electricians in your city on Google Maps → DM or email them:
   > "Hey [Name], I noticed you have [X] Google reviews. I built a tool that helps local
   > service businesses get more reviews via SMS — it's $29/mo vs $399/mo for Podium.
   > Want a free 2-week trial?"

**Reddit post template:**
```
Title: I was shocked Podium charges $399/mo just to text customers review links, so I built a $29 alternative

I run [type of business] and needed to get more Google reviews. Tried Podium - $399/month
and required an annual contract. Tried Birdeye - $299/month. Both seemed wildly overpriced
for what they actually do.

So I built ReviewPing. After each job you type your customer's name and phone number,
and they get a text with your Google review link. That's basically it.

$29/mo, no contract, cancel anytime. 14-day free trial.

reviewping.com [your domain]

Happy to answer questions or get feedback from business owners here.
```

### Week 2-4: AppSumo Application

**Goal:** $5k-$20k cash injection + 200-500 early users

1. Apply at partners.appsumo.com
2. Offer a lifetime deal: $49 one-time for lifetime Starter access
3. AppSumo gets you in front of 1M+ small business owners
4. Use this cash to fund Twilio costs and future development

### Month 2: Close LTD, Go Recurring

1. Stop selling the AppSumo deal
2. All new customers go to $29/mo or $79/mo subscriptions
3. Post on Indie Hackers: "From $0 to $X in 30 days building a Podium alternative"
4. Post on Product Hunt

### Month 3+: Scale What Works

- If Reddit worked → keep posting in niche subreddits
- If cold outreach worked → hire a VA to do outreach at scale
- Add features based on paying customer feedback
- Build an affiliate program (pay 20% recurring to people who refer customers)

---

## Pricing Rationale

| Plan     | Price   | Twilio Cost | Stripe Fee | Net Margin |
|----------|---------|-------------|------------|------------|
| Starter  | $29/mo  | ~$0.79      | ~$1.14     | ~$27/mo    |
| Pro      | $79/mo  | ~$5-15      | ~$2.60     | ~$60+/mo   |

At 100 customers: $2,900 MRR
At 500 customers: $14,500 MRR

---

## Revenue Milestones & Timeline

| Milestone  | Target    | How to get there                          |
|------------|-----------|-------------------------------------------|
| First $100 | Week 1    | 4 paying customers from Reddit            |
| $1k MRR    | Month 1-2 | 35 Starter customers, word of mouth       |
| $5k MRR    | Month 3-4 | AppSumo LTD close → recurring, cold email |
| $10k MRR   | Month 6   | Affiliate program, niche SEO content      |

---

## Key Metrics to Track

- Conversion rate: signups → trial starts
- Trial-to-paid conversion: target >25%
- Churn rate: target <5%/month
- Reviews sent per customer/month: shows engagement
- NPS from paying customers

---

## SEO Content to Write

These will rank on Google and bring in organic traffic:

1. "Podium alternatives for small businesses 2025"
2. "How to get more Google reviews automatically"
3. "Birdeye vs Podium vs [your tool]"
4. "How plumbers get more 5-star reviews"
5. "SMS review requests: how to ask customers for Google reviews"

---

## The Unfair Advantage

You are selling to a market that:
1. Already spends $300-$400/mo on this problem (proving willingness to pay)
2. Hates their current vendor (annual contracts, bad support)
3. Is not technical and doesn't know how to find alternatives
4. Has a direct ROI they can see (more reviews = more calls = more revenue)

You don't need to create demand. The demand exists. You just need to be cheaper,
simpler, and easier to cancel.
