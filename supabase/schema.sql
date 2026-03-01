-- ReviewPing Database Schema
-- Run this in your Supabase SQL editor

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Businesses table (a user can have multiple locations on Pro plan)
CREATE TABLE businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  industry TEXT,
  google_review_link TEXT,
  yelp_review_link TEXT,
  facebook_review_link TEXT,
  phone TEXT,
  website TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions table (synced from Stripe webhooks)
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  plan TEXT CHECK (plan IN ('starter', 'pro')) DEFAULT 'starter',
  status TEXT CHECK (status IN ('active', 'canceled', 'past_due', 'trialing', 'incomplete')) DEFAULT 'trialing',
  trial_ends_at TIMESTAMPTZ,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Review requests table
CREATE TABLE review_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_email TEXT,
  platform TEXT CHECK (platform IN ('google', 'yelp', 'facebook')) DEFAULT 'google',
  channel TEXT CHECK (channel IN ('sms', 'email', 'both')) DEFAULT 'sms',
  status TEXT CHECK (status IN ('pending', 'sent', 'failed', 'clicked')) DEFAULT 'pending',
  twilio_sid TEXT,
  sent_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Monthly usage tracking
CREATE TABLE monthly_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  month TEXT NOT NULL, -- format: 'YYYY-MM'
  requests_sent INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, month)
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_usage ENABLE ROW LEVEL SECURITY;

-- Policies: users can only see their own data
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own businesses" ON businesses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own subscription" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own requests" ON review_requests FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own usage" ON monthly_usage FOR SELECT USING (auth.uid() = user_id);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to increment monthly usage
CREATE OR REPLACE FUNCTION increment_monthly_usage(p_user_id UUID)
RETURNS void AS $$
DECLARE
  current_month TEXT := TO_CHAR(NOW(), 'YYYY-MM');
BEGIN
  INSERT INTO monthly_usage (user_id, month, requests_sent)
  VALUES (p_user_id, current_month, 1)
  ON CONFLICT (user_id, month)
  DO UPDATE SET
    requests_sent = monthly_usage.requests_sent + 1,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
