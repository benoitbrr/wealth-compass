import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import AppointmentModal from "@/components/AppointmentModal";
interface AssetCategory {
  id: string;
  label: string;
  value: number;
  riskScore: number;
}
const initialCategories: AssetCategory[] = [{
  id: "cash",
  label: "Fonds euros / Monétaire",
  value: 0,
  riskScore: 1
}, {
  id: "bonds",
  label: "Obligations / Fonds prudents",
  value: 0,
  riskScore: 2
}, {
  id: "stocks",
  label: "Actions / Fonds actions",
  value: 0,
  riskScore: 4
}, {
  id: "realestate",
  label: "Immobilier (SCPI, direct)",
  value: 0,
  riskScore: 3
}, {
  id: "pe",
  label: "Private Equity / Non coté",
  value: 0,
  riskScore: 5
}, {
  id: "crypto",
  label: "Crypto / Actifs alternatifs",
  value: 0,
  riskScore: 5
}];
interface CustomStrategyBuilderProps {
  onComplete: (strategy: string) => void;
}
const CustomStrategyBuilder = ({
  onComplete
}: CustomStrategyBuilderProps) => {
  const [categories, setCategories] = useState<AssetCategory[]>(initialCategories);
  const [showModal, setShowModal] = useState(false);
  const total = categories.reduce((sum, cat) => sum + cat.value, 0);
  const isValid = total === 100;
  const calculateRiskProfile = () => {
    const weightedRisk = categories.reduce((sum, cat) => sum + cat.value / 100 * cat.riskScore, 0);
    if (weightedRisk <= 2) return {
      level: "Prudent",
      color: "text-blue-600"
    };
    if (weightedRisk <= 3.5) return {
      level: "Équilibré",
      color: "text-green-600"
    };
    return {
      level: "Dynamique",
      color: "text-orange-600"
    };
  };
  const calculateExpectedReturn = () => {
    const weightedRisk = categories.reduce((sum, cat) => sum + cat.value / 100 * cat.riskScore, 0);
    const minReturn = Math.round(weightedRisk * 0.8 * 10) / 10;
    const maxReturn = Math.round(weightedRisk * 1.4 * 10) / 10;
    return `${minReturn}-${maxReturn}%`;
  };
  const handleSliderChange = (id: string, newValue: number[]) => {
    setCategories(categories.map(cat => cat.id === id ? {
      ...cat,
      value: newValue[0]
    } : cat));
  };
  const handleValidate = () => {
    if (!isValid) {
      toast({
        title: "Allocation invalide",
        description: "Le total doit être égal à 100%",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Stratégie validée !",
      description: "Votre allocation personnalisée a été enregistrée"
    });
    onComplete("custom");
  };
  const riskProfile = calculateRiskProfile();
  const expectedReturn = calculateExpectedReturn();
  return <>
      

      <AppointmentModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>;
};
export default CustomStrategyBuilder;