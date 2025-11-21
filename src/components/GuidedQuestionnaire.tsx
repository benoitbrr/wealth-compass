import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, Target } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import AppointmentModal from "@/components/AppointmentModal";

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string }[];
}

const questions: Question[] = [
  {
    id: "horizon",
    question: "Quel est votre horizon de placement principal ?",
    options: [
      { value: "short", label: "Court terme (< 3 ans)" },
      { value: "medium", label: "Moyen terme (3-5 ans)" },
      { value: "long", label: "Long terme (5-10 ans)" },
      { value: "verylong", label: "Très long terme (> 10 ans)" },
    ],
  },
  {
    id: "liquidity",
    question: "Quelle importance accordez-vous à la liquidité de vos placements ?",
    options: [
      { value: "low", label: "Faible - Je peux immobiliser mes fonds" },
      { value: "medium", label: "Moyenne - J'ai besoin d'une certaine flexibilité" },
      { value: "high", label: "Élevée - Je veux pouvoir récupérer mes fonds rapidement" },
    ],
  },
  {
    id: "risk",
    question: "Quel niveau de risque êtes-vous prêt à accepter ?",
    options: [
      { value: "veryprudent", label: "Très prudent - Je privilégie la sécurité" },
      { value: "prudent", label: "Prudent - Je limite les risques" },
      { value: "balanced", label: "Équilibré - J'accepte une volatilité modérée" },
      { value: "dynamic", label: "Dynamique - Je recherche la performance" },
    ],
  },
  {
    id: "income",
    question: "Préférez-vous des revenus réguliers ou la capitalisation ?",
    options: [
      { value: "income", label: "Revenus réguliers - Je veux percevoir des dividendes/intérêts" },
      { value: "mixed", label: "Mixte - Un peu des deux" },
      { value: "growth", label: "Capitalisation - Je réinvestis tout pour la croissance" },
    ],
  },
  {
    id: "illiquid",
    question: "Êtes-vous intéressé par des investissements illiquides (immobilier, private equity) ?",
    options: [
      { value: "no", label: "Non - Je préfère rester liquide" },
      { value: "some", label: "Un peu - Dans une faible proportion" },
      { value: "yes", label: "Oui - Je suis ouvert à l'illiquide" },
    ],
  },
  {
    id: "esg",
    question: "L'investissement responsable (ESG/durable) est-il important pour vous ?",
    options: [
      { value: "no", label: "Non - Ce n'est pas un critère prioritaire" },
      { value: "nice", label: "C'est un plus - Si c'est possible" },
      { value: "yes", label: "Oui - C'est essentiel pour moi" },
    ],
  },
];

interface GuidedQuestionnaireProps {
  profileData: any;
  onComplete: (strategy: string) => void;
}

const GuidedQuestionnaire = ({ profileData, onComplete }: GuidedQuestionnaireProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleNext = () => {
    if (!answers[questions[currentStep].id]) {
      toast({
        title: "Réponse requise",
        description: "Veuillez sélectionner une option avant de continuer",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateStrategy();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateStrategy = () => {
    // Mock strategy generation based on answers
    const riskLevel = answers.risk;
    let strategyType = "balanced";
    
    if (riskLevel === "veryprudent" || riskLevel === "prudent") {
      strategyType = "conservative";
    } else if (riskLevel === "dynamic") {
      strategyType = "growth";
    }

    setCompleted(true);
    onComplete(strategyType);
  };

  const getStrategyDetails = () => {
    const riskLevel = answers.risk;
    
    if (riskLevel === "veryprudent" || riskLevel === "prudent") {
      return {
        title: "Stratégie Prudente",
        risk: "Bas",
        target: "2-3%",
        allocation: [
          { label: "Fonds euros / Monétaire", value: "40%" },
          { label: "Obligations prudentes", value: "35%" },
          { label: "Actions défensives", value: "15%" },
          { label: "Immobilier / SCPI", value: "10%" },
        ],
        description: "Cette allocation privilégie la protection du capital avec une exposition limitée aux actifs risqués.",
      };
    } else if (riskLevel === "dynamic") {
      return {
        title: "Stratégie Dynamique",
        risk: "Élevé",
        target: "5-7%",
        allocation: [
          { label: "Actions internationales", value: "45%" },
          { label: "Fonds diversifiés", value: "25%" },
          { label: "Private Equity", value: "15%" },
          { label: "Immobilier", value: "10%" },
          { label: "Monétaire", value: "5%" },
        ],
        description: "Cette allocation vise une forte croissance à long terme en acceptant une volatilité élevée.",
      };
    } else {
      return {
        title: "Stratégie Équilibrée",
        risk: "Moyen",
        target: "3-5%",
        allocation: [
          { label: "Fonds diversifiés", value: "30%" },
          { label: "Actions", value: "25%" },
          { label: "Obligations", value: "20%" },
          { label: "Immobilier", value: "15%" },
          { label: "Monétaire", value: "10%" },
        ],
        description: "Cette allocation offre un bon équilibre entre sécurité et potentiel de croissance.",
      };
    }
  };

  if (completed) {
    const strategy = getStrategyDetails();
    
    return (
      <>
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-secondary/20">
              <Target className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Votre stratégie personnalisée</h3>
              <p className="text-sm text-muted-foreground">Basée sur vos réponses</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-lg mb-2">{strategy.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{strategy.description}</p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">Niveau de risque</p>
                  <p className="font-semibold">{strategy.risk}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">Rendement cible indicatif</p>
                  <p className="font-semibold">{strategy.target} / an</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Répartition indicative :</p>
                {strategy.allocation.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline"
                onClick={() => setShowModal(true)}
                className="flex-1"
              >
                Discuter avec un conseiller
              </Button>
              <Button 
                onClick={() => {
                  setCompleted(false);
                  setCurrentStep(0);
                  setAnswers({});
                }}
                variant="outline"
                className="flex-1"
              >
                Refaire le questionnaire
              </Button>
            </div>
          </div>
        </Card>

        <AppointmentModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
        />
      </>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold">Trouver une stratégie qui me correspond</h3>
          <span className="text-sm text-muted-foreground">
            {currentStep + 1} / {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="mb-8">
        <h4 className="font-semibold mb-4">{currentQuestion.question}</h4>
        <RadioGroup
          value={answers[currentQuestion.id]}
          onValueChange={(value) =>
            setAnswers({ ...answers, [currentQuestion.id]: value })
          }
        >
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-3 p-3 rounded-lg border hover:border-secondary/50 transition-colors"
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label
                  htmlFor={option.value}
                  className="flex-1 cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Précédent
        </Button>
        <Button onClick={handleNext}>
          {currentStep === questions.length - 1 ? "Voir ma stratégie" : "Suivant"}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
};

export default GuidedQuestionnaire;
