# ReviewPing — Quick Start

## Get running in 30 minutes

### Step 1: Install dependencies

```bash
npm install
```

### Step 2: Set up Supabase (free)

1. Go to https://supabase.com → New project
2. Name it "reviewping", pick a region close to your users
3. Once created, go to **SQL Editor** → paste entire contents of `supabase/schema.sql` → Run
4. Go to **Settings → API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### Step 3: Set up Twilio (free trial gives $15 credit)

1. Go to https://twilio.com → Sign up
2. Get a phone number (US): Console → Phone Numbers → Buy
3. Copy from Console dashboard:
   - Account SID → `TWILIO_ACCOUNT_SID`
   - Auth Token → `TWILIO_AUTH_TOKEN`
   - Your number → `TWILIO_PHONE_NUMBER` (format: +1XXXXXXXXXX)

**Cost:** ~$1/mo for the number + $0.0079 per SMS. 100 customers at ~5 SMS/mo = ~$4/mo in Twilio costs.

### Step 4: Set up Stripe (free until you earn money)

1. Go to https://stripe.com → Create account
2. Dashboard → Products → **Add product**:
   - "ReviewPing Starter" → $29/month recurring → copy Price ID
   - "ReviewPing Pro" → $79/month recurring → copy Price ID
3. Copy from Developers → API keys:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`
4. Set up webhook (Developers → Webhooks → Add endpoint):
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.updated`,
     `customer.subscription.deleted`, `invoice.payment_failed`
   - Copy signing secret → `STRIPE_WEBHOOK_SECRET`

**For local testing:** Use `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

### Step 5: Configure environment

```bash
cp .env.example .env.local
# Fill in all values from steps above
# Set NEXT_PUBLIC_APP_URL=http://localhost:3000 for local dev
```

### Step 6: Run locally

```bash
npm run dev
```

Open http://localhost:3000

### Step 7: Deploy to Vercel (free)

```bash
# Push to GitHub first, then:
# 1. vercel.com → Import project → select repo
# 2. Add all env vars from .env.local
# 3. Set NEXT_PUBLIC_APP_URL to your Vercel domain
# 4. Deploy
```

Your app is live. Update the Stripe webhook URL to your Vercel domain.

---

## What to do your first week

### Day 1: Make sure it works
1. Sign up with your own email
2. Complete setup with a test Google review link
3. Send a test SMS to your own phone number
4. Verify it arrives and the link works

### Day 2-3: First Reddit posts

Post in these subreddits (use the templates in LAUNCH_GUIDE.md):
- r/plumbers
- r/electricians
- r/Homebuilding
- r/smallbusiness
- r/Entrepreneur

**Key framing:** You're a fellow business owner who built this because Podium wanted $399/mo.
Don't pitch — share the story.

### Day 4-5: Cold outreach
1. Open Google Maps
2. Search "plumber [your city]"
3. Find 20 businesses with <20 reviews and no "Birdeye" or similar badge
4. Find their email from their Google profile or website
5. Send this email:

```
Subject: Quick question about your Google reviews

Hey [Name],

I noticed [Business Name] has X Google reviews — great work standing out on Google Maps.

I recently built a tool that sends your customers a quick text after each job asking
for a review. Most customers leave one within an hour. It's $29/month (vs. Podium's
$399/month), no annual contract.

If you'd like a free 2-week trial, just reply and I'll set you up.

[Your name]
```

### Day 7: First paying customer
Close your first sale. Even if it's just 1 customer at $29 — that's proof it works.
Then post about it on r/SaaS and Indie Hackers.

---

## Revenue Projections

| Customers | Monthly Revenue | Notes |
|-----------|----------------|-------|
| 10        | $290/mo        | Quit coffee shop meetings level |
| 50        | $1,450/mo      | Side income level |
| 100       | $2,900/mo      | Part-time income level |
| 300       | $8,700/mo      | Full-time income level |
| 500       | $14,500/mo     | Life-changing level |

Twilio + Stripe fees at 500 customers: ~$600-1,200/mo. Net margin: ~90%.
