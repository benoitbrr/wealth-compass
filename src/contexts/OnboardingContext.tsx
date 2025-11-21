import React, { createContext, useContext, useState, ReactNode } from "react";

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
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
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
  const [data, setData] = useState<OnboardingData>(() => {
    const saved = localStorage.getItem("bnp-onboarding");
    return saved ? JSON.parse(saved) : defaultData;
  });

  const updateData = (field: keyof OnboardingData, value: any) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    localStorage.setItem("bnp-onboarding", JSON.stringify(newData));
  };

  const completeOnboarding = () => {
    const newData = { ...data, completed: true };
    setData(newData);
    localStorage.setItem("bnp-onboarding", JSON.stringify(newData));
  };

  const resetOnboarding = () => {
    setData(defaultData);
    localStorage.removeItem("bnp-onboarding");
  };

  return (
    <OnboardingContext.Provider value={{ data, updateData, completeOnboarding, resetOnboarding }}>
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
