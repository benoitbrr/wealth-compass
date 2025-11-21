-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  segment TEXT DEFAULT 'Private Banking',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create investment_profile table
CREATE TABLE public.investment_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  experience TEXT,
  main_challenge TEXT,
  main_goal TEXT,
  wealth_level TEXT,
  asset_categories JSONB DEFAULT '[]'::jsonb,
  risk_appetite TEXT,
  selected_strategy TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on investment_profile
ALTER TABLE public.investment_profile ENABLE ROW LEVEL SECURITY;

-- Investment profile policies
CREATE POLICY "Users can view their own investment profile"
  ON public.investment_profile FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own investment profile"
  ON public.investment_profile FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own investment profile"
  ON public.investment_profile FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create accounts table
CREATE TABLE public.accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  balance NUMERIC(15, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on accounts
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;

-- Accounts policies
CREATE POLICY "Users can view their own accounts"
  ON public.accounts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own accounts"
  ON public.accounts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own accounts"
  ON public.accounts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create positions table
CREATE TABLE public.positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE,
  asset_type TEXT NOT NULL,
  instrument_name TEXT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  current_value NUMERIC(15, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on positions
ALTER TABLE public.positions ENABLE ROW LEVEL SECURITY;

-- Positions policies
CREATE POLICY "Users can view their own positions"
  ON public.positions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own positions"
  ON public.positions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own positions"
  ON public.positions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own positions"
  ON public.positions FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger to update updated_at on investment_profile
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_investment_profile_updated_at
  BEFORE UPDATE ON public.investment_profile
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_positions_updated_at
  BEFORE UPDATE ON public.positions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, segment)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'Private Banking'
  );
  
  -- Create default account with 60M EUR
  INSERT INTO public.accounts (user_id, name, type, currency, balance)
  VALUES (
    NEW.id,
    'Compte courant BNP Paribas',
    'CURRENT_ACCOUNT',
    'EUR',
    60000000.00
  );
  
  -- Create empty investment profile
  INSERT INTO public.investment_profile (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();