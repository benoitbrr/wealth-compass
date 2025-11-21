import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useInvestmentProfile } from "@/hooks/useInvestmentProfile";

interface OnboardingData {
  firstName: string;
  age: number | null;
  country: string;
  experience: string;
  mainChallenge: string;
  mainGoal: string;
  wealthLevel: string;
  assetCategories: string[];
  riskAppetite: string;
  completed: boolean;
  selectedStrategy?: string;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
  completeOnboarding: (selectedStrategy: string) => Promise<void>;
  resetOnboarding: () => void;
  loading: boolean;
}

const defaultData: OnboardingData = {
  firstName: "",
  age: null,
  country: "",
  experience: "",
  mainChallenge: "",
  mainGoal: "",
  wealthLevel: "",
  assetCategories: [],
  riskAppetite: "",
  completed: false,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<OnboardingData>(defaultData);
  const [loading, setLoading] = useState(true);
  const { investmentProfile, updateInvestmentProfile } = useInvestmentProfile();

  // Load existing investment profile data
  useEffect(() => {
    if (investmentProfile) {
      setData({
        firstName: "",
        age: null,
        country: "",
        experience: investmentProfile.experience || "",
        mainChallenge: investmentProfile.main_challenge || "",
        mainGoal: investmentProfile.main_goal || "",
        wealthLevel: investmentProfile.wealth_level || "",
        assetCategories: investmentProfile.asset_categories || [],
        riskAppetite: investmentProfile.risk_appetite || "",
        selectedStrategy: investmentProfile.selected_strategy || "",
        completed: !!investmentProfile.selected_strategy,
      });
    }
    setLoading(false);
  }, [investmentProfile]);

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const completeOnboarding = async (selectedStrategy: string) => {
    try {
      await updateInvestmentProfile({
        experience: data.experience,
        main_challenge: data.mainChallenge,
        main_goal: data.mainGoal,
        wealth_level: data.wealthLevel,
        asset_categories: data.assetCategories,
        risk_appetite: data.riskAppetite,
        selected_strategy: selectedStrategy,
      });

      setData(prev => ({ ...prev, completed: true, selectedStrategy }));
    } catch (error) {
      console.error('Error completing onboarding:', error);
      throw error;
    }
  };

  const resetOnboarding = () => {
    setData(defaultData);
  };

  return (
    <OnboardingContext.Provider value={{ data, updateData, completeOnboarding, resetOnboarding, loading }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
};
