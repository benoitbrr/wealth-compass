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
  {
    id: "cash",
    label: "Fonds euros / Monétaire",
    value: 0,
    riskScore: 1,
  },
  {
    id: "bonds",
    label: "Obligations / Fonds prudents",
    value: 0,
    riskScore: 2,
  },
  {
    id: "stocks",
    label: "Actions / Fonds actions",
    value: 0,
    riskScore: 4,
  },
  {
    id: "realestate",
    label: "Immobilier (SCPI, direct)",
    value: 0,
    riskScore: 3,
  },
  {
    id: "pe",
    label: "Private Equity / Non coté",
    value: 0,
    riskScore: 5,
  },
  {
    id: "crypto",
    label: "Crypto / Actifs alternatifs",
    value: 0,
    riskScore: 5,
  },
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
    const weightedRisk = categories.reduce((sum, cat) => sum + (cat.value / 100) * cat.riskScore, 0);
    if (weightedRisk <= 2)
      return {
        level: "Prudent",
        color: "text-primary",
      };
    if (weightedRisk <= 3.5)
      return {
        level: "Équilibré",
        color: "text-secondary",
      };
    return {
      level: "Dynamique",
      color: "text-gold",
    };
  };

  const calculateExpectedReturn = () => {
    const weightedRisk = categories.reduce((sum, cat) => sum + (cat.value / 100) * cat.riskScore, 0);
    const minReturn = Math.round(weightedRisk * 0.8 * 10) / 10;
    const maxReturn = Math.round(weightedRisk * 1.4 * 10) / 10;
    return `${minReturn}-${maxReturn}%`;
  };

  const handleSliderChange = (id: string, newValue: number[]) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id
          ? {
              ...cat,
              value: newValue[0],
            }
          : cat
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
        <div className="space-y-6">
          {/* Sliders */}
          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor={cat.id} className="text-sm font-medium">
                    {cat.label}
                  </Label>
                  <span className="text-sm font-semibold">{cat.value}%</span>
                </div>
                <Slider
                  id={cat.id}
                  value={[cat.value]}
                  onValueChange={(newValue) => handleSliderChange(cat.id, newValue)}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          {/* Total & Validation */}
          <div className="pt-4 border-t space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total :</span>
              <div className="flex items-center gap-2">
                <span className={`text-xl font-bold ${isValid ? "text-success" : "text-destructive"}`}>
                  {total}%
                </span>
                {isValid ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-destructive" />
                )}
              </div>
            </div>

            {!isValid && (
              <p className="text-sm text-destructive flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Le total doit être égal à 100%
              </p>
            )}

            {/* Risk & Return */}
            {total > 0 && (
              <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Profil de risque</p>
                  <p className={`font-semibold ${riskProfile.color}`}>{riskProfile.level}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Rendement cible</p>
                  <p className="font-semibold">{expectedReturn}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleValidate}
                disabled={!isValid}
                className="flex-1 bg-primary hover:bg-bnp-dark-green"
              >
                Ajouter à ma stratégie
              </Button>
              <Button variant="outline" onClick={() => setShowModal(true)}>
                En parler à un conseiller
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <AppointmentModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default CustomStrategyBuilder;
