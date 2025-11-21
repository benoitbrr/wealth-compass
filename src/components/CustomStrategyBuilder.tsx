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

const initialCategories: AssetCategory[] = [
  { id: "cash", label: "Fonds euros / Monétaire", value: 0, riskScore: 1 },
  { id: "bonds", label: "Obligations / Fonds prudents", value: 0, riskScore: 2 },
  { id: "stocks", label: "Actions / Fonds actions", value: 0, riskScore: 4 },
  { id: "realestate", label: "Immobilier (SCPI, direct)", value: 0, riskScore: 3 },
  { id: "pe", label: "Private Equity / Non coté", value: 0, riskScore: 5 },
  { id: "crypto", label: "Crypto / Actifs alternatifs", value: 0, riskScore: 5 },
];

interface CustomStrategyBuilderProps {
  onComplete: (strategy: string) => void;
}

const CustomStrategyBuilder = ({ onComplete }: CustomStrategyBuilderProps) => {
  const [categories, setCategories] = useState<AssetCategory[]>(initialCategories);
  const [showModal, setShowModal] = useState(false);

  const total = categories.reduce((sum, cat) => sum + cat.value, 0);
  const isValid = total === 100;

  const calculateRiskProfile = () => {
    const weightedRisk = categories.reduce(
      (sum, cat) => sum + (cat.value / 100) * cat.riskScore,
      0
    );

    if (weightedRisk <= 2) return { level: "Prudent", color: "text-blue-600" };
    if (weightedRisk <= 3.5) return { level: "Équilibré", color: "text-green-600" };
    return { level: "Dynamique", color: "text-orange-600" };
  };

  const calculateExpectedReturn = () => {
    const weightedRisk = categories.reduce(
      (sum, cat) => sum + (cat.value / 100) * cat.riskScore,
      0
    );

    const minReturn = Math.round(weightedRisk * 0.8 * 10) / 10;
    const maxReturn = Math.round(weightedRisk * 1.4 * 10) / 10;

    return `${minReturn}-${maxReturn}%`;
  };

  const handleSliderChange = (id: string, newValue: number[]) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, value: newValue[0] } : cat
      )
    );
  };

  const handleValidate = () => {
    if (!isValid) {
      toast({
        title: "Allocation invalide",
        description: "Le total doit être égal à 100%",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Stratégie validée !",
      description: "Votre allocation personnalisée a été enregistrée",
    });

    onComplete("custom");
  };

  const riskProfile = calculateRiskProfile();
  const expectedReturn = calculateExpectedReturn();

  return (
    <>
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Créer ma propre stratégie</h3>
          <p className="text-sm text-muted-foreground">
            Vous avez déjà des convictions fortes ? Construisez votre propre allocation en sélectionnant les types de produits qui vous intéressent.
          </p>
        </div>

        <div className="space-y-6 mb-6">
          {categories.map((category) => (
            <div key={category.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">{category.label}</Label>
                <span className="text-sm font-bold">{category.value}%</span>
              </div>
              <Slider
                value={[category.value]}
                onValueChange={(value) => handleSliderChange(category.id, value)}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          ))}
        </div>

        <div className="p-4 rounded-lg bg-muted mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Total de l'allocation</span>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-bold ${isValid ? "text-green-600" : "text-destructive"}`}>
                {total}%
              </span>
              {isValid ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-destructive" />
              )}
            </div>
          </div>

          {isValid && (
            <div className="space-y-2 pt-3 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Profil de risque estimé</span>
                <span className={`font-semibold ${riskProfile.color}`}>
                  {riskProfile.level}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rendement cible indicatif</span>
                <span className="font-semibold">{expectedReturn} / an</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleValidate}
            disabled={!isValid}
            className="flex-1 bg-[#00A693] hover:bg-[#00957F]"
          >
            Valider ma stratégie personnalisée
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowModal(true)}
            className="flex-1"
          >
            En discuter avec un conseiller
          </Button>
        </div>
      </Card>

      <AppointmentModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
};

export default CustomStrategyBuilder;
