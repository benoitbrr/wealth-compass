import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Target, TrendingUp, Shield, Home, Bitcoin, Briefcase, PiggyBank, Building2 } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import ChatOptionCard from "@/components/ChatOptionCard";
import BNPLogo from "@/components/BNPLogo";
import BNPPattern from "@/components/BNPPattern";
import { useOnboarding } from "@/contexts/OnboardingContext";

type Step = "welcome" | "experience" | "challenge" | "goal" | "wealth" | "assets" | "risk" | "strategies" | "complete";

const ChatOnboarding = () => {
  const navigate = useNavigate();
  const { data, updateData, completeOnboarding } = useOnboarding();
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [messages, setMessages] = useState<Array<{ role: "assistant" | "user"; content: string }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef(0);

  const isNearBottom = () => {
    const container = chatContainerRef.current;
    if (!container) return true;
    
    const threshold = 100;
    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    return distanceFromBottom < threshold;
  };

  const scrollToBottom = () => {
    if (!messagesEndRef.current) return;
    
    // Only scroll if user is near the bottom
    if (isNearBottom()) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "end",
        inline: "nearest"
      });
    }
  };

  useEffect(() => {
    // Only auto-scroll when new assistant messages are added
    const lastMessage = messages[messages.length - 1];
    const hasNewMessage = messages.length > prevMessagesLengthRef.current;
    
    if (hasNewMessage && lastMessage?.role === "assistant") {
      // Small delay to ensure DOM is updated
      setTimeout(scrollToBottom, 100);
    }
    
    prevMessagesLengthRef.current = messages.length;
  }, [messages]);

  useEffect(() => {
    // Onboarding orienté uniquement investissement (client BNP déjà connu)
    setTimeout(() => {
      setMessages([
        {
          role: "assistant",
          content: "Bienvenue sur E-Private Next Gen, votre espace patrimonial digital BNP Paribas.",
        },
      ]);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Nous allons nous concentrer sur votre stratégie d'investissement, à partir de votre situation déjà connue en tant que client BNP Paribas.",
          },
        ]);

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "Pour commencer, comment décririez-vous votre expérience en investissement ?",
            },
          ]);
          setCurrentStep("experience");
        }, 1200);
      }, 1200);
    }, 500);
  }, []);

  const progress =
    {
      welcome: 0,
      experience: 15,
      challenge: 30,
      goal: 45,
      wealth: 60,
      assets: 75,
      risk: 90,
      strategies: 98,
      complete: 100,
    }[currentStep] ?? 0;

  const handleOptionSelect = (field: keyof typeof data, value: string, nextStep: Step, nextQuestion: string) => {
    updateData(field, value);
    setMessages((prev) => [...prev, { role: "user", content: value }, { role: "assistant", content: nextQuestion }]);
    setCurrentStep(nextStep);
  };

  const handleMultiSelect = (category: string) => {
    const current = data.assetCategories || [];
    const updated = current.includes(category) ? current.filter((c) => c !== category) : [...current, category];
    updateData("assetCategories", updated);
  };

  const handleComplete = () => {
    completeOnboarding();
    navigate("/dashboard");
  };

  const handleShowStrategies = () => {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Parfait. Voici les stratégies d'investissement que je recommande pour votre profil :",
      },
    ]);
    setCurrentStep("strategies");
  };

  return (
    <div className="min-h-screen bg-background bnp-pattern relative flex flex-col">
      <BNPPattern />

      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-xl z-50 shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <BNPLogo />
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden md:block">{Math.round(progress)}% complété</span>
            </div>
          </div>
          <Progress value={progress} className="mt-4 h-2" />
        </div>
      </header>

      {/* Chat Container */}
      <main ref={chatContainerRef} className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="space-y-6 mb-32">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} role={msg.role} content={msg.content} delay={idx * 0.1} />
            ))}

            {/* EXPÉRIENCE */}
            {currentStep === "experience" && (
              <div className="flex gap-4 animate-fade-in">
                <div className="flex-shrink-0 w-10 h-10" />
                <div className="flex-1 max-w-2xl grid gap-3">
                  {[
                    "Je débute totalement",
                    "Je connais les bases",
                    "J'investis depuis un moment",
                    "Je suis très expérimenté",
                  ].map((option, idx) => (
                    <ChatOptionCard
                      key={idx}
                      label={option}
                      selected={data.experience === option}
                      onClick={() =>
                        handleOptionSelect(
                          "experience",
                          option,
                          "challenge",
                          "Très bien. Qu'est-ce qui vous pose le plus de difficultés aujourd'hui dans votre stratégie d'investissement ?",
                        )
                      }
                      delay={idx * 0.1}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* CHALLENGE */}
            {currentStep === "challenge" && (
              <div className="flex gap-4 animate-fade-in">
                <div className="flex-shrink-0 w-10 h-10" />
                <div className="flex-1 max-w-2xl grid gap-3">
                  {[
                    { label: "J'ai peur de perdre de l'argent", icon: Shield },
                    { label: "Je manque de temps", icon: Target },
                    {
                      label: "Je dépends trop de mon banquier",
                      icon: TrendingUp,
                    },
                    {
                      label: "Je veux une vue claire de mon patrimoine",
                      icon: Target,
                    },
                    { label: "Je veux être accompagné", icon: Shield },
                  ].map((option, idx) => (
                    <ChatOptionCard
                      key={idx}
                      label={option.label}
                      icon={option.icon}
                      selected={data.mainChallenge === option.label}
                      onClick={() =>
                        handleOptionSelect(
                          "mainChallenge",
                          option.label,
                          "goal",
                          "Je comprends. Quel est votre objectif patrimonial principal avec cette stratégie ?",
                        )
                      }
                      delay={idx * 0.1}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* OBJECTIF */}
            {currentStep === "goal" && (
              <div className="flex gap-4 animate-fade-in">
                <div className="flex-shrink-0 w-10 h-10" />
                <div className="flex-1 max-w-2xl grid gap-3">
                  {[
                    "Faire fructifier mon patrimoine",
                    "Préparer ma retraite",
                    "Optimiser mon organisation",
                    "Préparer ma transmission",
                    "Comprendre ma situation",
                  ].map((option, idx) => (
                    <ChatOptionCard
                      key={idx}
                      label={option}
                      selected={data.mainGoal === option}
                      onClick={() =>
                        handleOptionSelect(
                          "mainGoal",
                          option,
                          "wealth",
                          "Parfait. Pour calibrer la stratégie, pourriez-vous me donner une indication de votre niveau de patrimoine financier global ?",
                        )
                      }
                      delay={idx * 0.1}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* NIVEAU DE PATRIMOINE */}
            {currentStep === "wealth" && (
              <div className="flex gap-4 animate-fade-in">
                <div className="flex-shrink-0 w-10 h-10" />
                <div className="flex-1 max-w-2xl grid gap-3">
                  {[
                    "< 50 000 €",
                    "50 000 – 200 000 €",
                    "200 000 – 500 000 €",
                    "500 000 – 1 000 000 €",
                    "1 000 000 – 2 000 000 €",
                    "> 2 000 000 €",
                  ].map((option, idx) => (
                    <ChatOptionCard
                      key={idx}
                      label={option}
                      selected={data.wealthLevel === option}
                      onClick={() =>
                        handleOptionSelect(
                          "wealthLevel",
                          option,
                          "assets",
                          "Merci. Quelles catégories d'actifs souhaitez-vous intégrer dans votre stratégie et suivre au quotidien ? (Vous pouvez en sélectionner plusieurs)",
                        )
                      }
                      delay={idx * 0.1}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* CATÉGORIES D’ACTIFS */}
            {currentStep === "assets" && (
              <div className="flex gap-4 animate-fade-in">
                <div className="flex-shrink-0 w-10 h-10" />
                <div className="flex-1 max-w-2xl">
                  <div className="grid gap-3 mb-4">
                    {[
                      { label: "Comptes bancaires", icon: Building2 },
                      { label: "Livrets", icon: PiggyBank },
                      { label: "Assurance-vie", icon: Shield },
                      { label: "Comptes titres / PEA", icon: TrendingUp },
                      { label: "Immobilier", icon: Home },
                      { label: "Crypto", icon: Bitcoin },
                      { label: "Private Equity", icon: Briefcase },
                    ].map((option, idx) => (
                      <ChatOptionCard
                        key={idx}
                        label={option.label}
                        icon={option.icon}
                        selected={(data.assetCategories || []).includes(option.label)}
                        onClick={() => handleMultiSelect(option.label)}
                        delay={idx * 0.1}
                      />
                    ))}
                  </div>
                  <Button
                    onClick={() => {
                      setMessages((prev) => [
                        ...prev,
                        {
                          role: "user",
                          content: `${data.assetCategories?.length || 0} catégories sélectionnées`,
                        },
                        {
                          role: "assistant",
                          content:
                            "Très bien. Dernière question : quelle est votre appétence au risque pour cette stratégie d'investissement ?",
                        },
                      ]);
                      setCurrentStep("risk");
                    }}
                    className="w-full bg-secondary hover:bg-bnp-dark-green"
                    disabled={!data.assetCategories || data.assetCategories.length === 0}
                  >
                    Continuer
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* RISQUE */}
            {currentStep === "risk" && (
              <div className="flex gap-4 animate-fade-in">
                <div className="flex-shrink-0 w-10 h-10" />
                <div className="flex-1 max-w-2xl grid gap-3">
                  {["Très prudent", "Prudent", "Équilibré", "Dynamique", "Très dynamique"].map((option, idx) => (
                    <ChatOptionCard
                      key={idx}
                      label={option}
                      selected={data.riskAppetite === option}
                      onClick={() => {
                        updateData("riskAppetite", option);
                        setMessages((prev) => [
                          ...prev,
                          { role: "user", content: option },
                          {
                            role: "assistant",
                            content:
                              "Parfait. J'ai maintenant tous les éléments nécessaires pour vous proposer une stratégie d'investissement adaptée.",
                          },
                        ]);
                        setTimeout(handleShowStrategies, 2000);
                      }}
                      delay={idx * 0.1}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STRATÉGIES RECOMMANDÉES */}
            {currentStep === "strategies" && (
              <div className="flex gap-4 animate-fade-in">
                <div className="flex-shrink-0 w-10 h-10" />
                <div className="flex-1 max-w-full">
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {/* Stabilité */}
                    <Card className="p-5 flex flex-col hover:shadow-lg transition-shadow">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-2 rounded-lg bg-secondary/20">
                            <Shield className="w-5 h-5 text-secondary" />
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            Prudent
                          </Badge>
                        </div>

                        <h4 className="font-bold mb-2">Stabilité & Revenu</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Pour protéger votre capital tout en générant des revenus réguliers.
                        </p>

                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Niveau de risque</span>
                            <span className="font-medium">Bas</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Rendement cible</span>
                            <span className="font-medium">2-3% / an</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs font-medium mb-2">Répartition :</p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Fonds euros / Monétaire</span>
                              <span className="font-medium">40%</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Obligations prudentes</span>
                              <span className="font-medium">35%</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Immobilier / SCPI</span>
                              <span className="font-medium">25%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button onClick={handleComplete} className="w-full bg-primary hover:bg-bnp-dark-green" size="sm">
                        Je choisis cette stratégie
                      </Button>
                    </Card>

                    {/* Équilibrée */}
                    <Card className="p-5 flex flex-col hover:shadow-lg transition-shadow border-2 border-primary/50">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-2 rounded-lg bg-secondary/20">
                            <Target className="w-5 h-5 text-secondary" />
                          </div>
                          <Badge className="text-xs bg-primary">Recommandée</Badge>
                        </div>

                        <h4 className="font-bold mb-2">Équilibre & Croissance</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Pour chercher une performance supérieure à l'inflation tout en maîtrisant le risque.
                        </p>

                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Niveau de risque</span>
                            <span className="font-medium">Moyen</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Rendement cible</span>
                            <span className="font-medium">3-5% / an</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs font-medium mb-2">Répartition :</p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Fonds diversifiés</span>
                              <span className="font-medium">30%</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Actions</span>
                              <span className="font-medium">25%</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Obligations</span>
                              <span className="font-medium">20%</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Immobilier</span>
                              <span className="font-medium">15%</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Private Equity</span>
                              <span className="font-medium">10%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button onClick={handleComplete} className="w-full bg-primary hover:bg-bnp-dark-green" size="sm">
                        Je choisis cette stratégie
                      </Button>
                    </Card>

                    {/* Croissance */}
                    <Card className="p-5 flex flex-col hover:shadow-lg transition-shadow">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-2 rounded-lg bg-secondary/20">
                            <TrendingUp className="w-5 h-5 text-secondary" />
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            Dynamique
                          </Badge>
                        </div>

                        <h4 className="font-bold mb-2">Croissance Long Terme</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Pour accepter plus de volatilité et viser une croissance forte à long terme.
                        </p>

                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Niveau de risque</span>
                            <span className="font-medium">Élevé</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Rendement cible</span>
                            <span className="font-medium">5-7% / an</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs font-medium mb-2">Répartition :</p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Actions internationales</span>
                              <span className="font-medium">45%</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Fonds thématiques</span>
                              <span className="font-medium">25%</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Private Equity</span>
                              <span className="font-medium">15%</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Immobilier</span>
                              <span className="font-medium">10%</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Monétaire</span>
                              <span className="font-medium">5%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button onClick={handleComplete} className="w-full bg-primary hover:bg-bnp-dark-green" size="sm">
                        Je choisis cette stratégie
                      </Button>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatOnboarding;
