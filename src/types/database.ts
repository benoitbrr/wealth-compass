export interface Profile {
  id: string;
  full_name: string | null;
  segment: string | null;
  created_at: string;
}

export interface InvestmentProfile {
  id: string;
  user_id: string;
  experience: string | null;
  main_challenge: string | null;
  main_goal: string | null;
  wealth_level: string | null;
  asset_categories: string[] | null;
  risk_appetite: string | null;
  selected_strategy: string | null;
  created_at: string;
  updated_at: string;
}

export interface Account {
  id: string;
  user_id: string;
  name: string;
  type: string;
  currency: string;
  balance: number;
  created_at: string;
}

export interface Position {
  id: string;
  user_id: string;
  account_id: string | null;
  asset_type: string;
  instrument_name: string;
  currency: string;
  current_value: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioData {
  accounts: Account[];
  positions: Position[];
  totalAssets: number;
  cashBalance: number;
}
