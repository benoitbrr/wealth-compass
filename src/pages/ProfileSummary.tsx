import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Target, TrendingUp, User, MapPin, Award, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import BNPLogo from "@/components/BNPLogo";
import BNPPattern from "@/components/BNPPattern";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useEffect } from "react";

const ProfileSummary = () => {
  const navigate = useNavigate();
  const { data } = useOnboarding();

  useEffect(() => {
    if (!data.riskAppetite) {
      navigate("/onboarding");
    }
  }, [data, navigate]);

  const getProfileAnalysis = () => {
    const riskLevel = data.riskAppetite?.toLowerCase() || "";
    const experience = data.experience?.toLowerCase() || "";
    
    if (riskLevel.includes("dynamique") && experience.includes("expérimenté")) {
      return "Votre profil révèle un investisseur aguerri avec une appétence élevée pour la croissance. Vous êtes prêt à saisir des opportunités ambitieuses tout en optimisant votre allocation.";
    } else if (riskLevel.includes("prudent") || riskLevel.includes("conservateur")) {
      return "Votre profil démontre une approche patrimoniale sécurisée et réfléchie. Vous privilégiez la préservation du capital avec une croissance maîtrisée.";
    } else {
      return "Votre profil indique une stratégie d'investissement équilibrée, alliant sécurité et opportunités de croissance mesurée.";
    }
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    if (data.mainChallenge?.includes("vue claire")) {
      recommendations.push("Dashboard 360° personnalisé pour une visibilité totale sur votre patrimoine");
    }
    
    if (data.mainGoal?.includes("fructifier")) {
      recommendations.push("Stratégies de croissance adaptées à votre profil de risque");
    }
    
    if (data.mainGoal?.includes("retraite")) {
      recommendations.push("Simulation patrimoniale longue durée avec projections retraite");
    }
    
    if (data.experience?.includes("débute")) {
      recommendations.push("Accompagnement personnalisé par nos experts Private Banking");
    }
    
    if (!recommendations.length) {
      recommendations.push(
        "Analyse patrimoniale complète personnalisée",
        "Accès aux insights IA et recommandations BNP",
        "Suivi en temps réel de vos actifs"
      );
    }
    
    return recommendations;
  };

  return (
    <div className="min-h-screen bg-background bnp-pattern relative flex flex-col">
      <BNPPattern />
      
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-xl z-50 shadow-card">
        <div className="container mx-auto px-4 py-4">
          <BNPLogo />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full relative">
          {/* Success Badge */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-6">
              <CheckCircle2 className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-bnp-dark-green bg-clip-text text-transparent">
              Votre Profil BNP Private Banking
            </h1>
            <p className="text-lg text-muted-foreground">
              Analyse personnalisée créée avec succès
            </p>
          </div>

          {/* Profile Summary Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Card className="p-4 border-2 border-secondary/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-secondary/20">
                  <User className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Profil</p>
                  <p className="font-semibold">{data.firstName}</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                {data.age} ans • {data.country}
              </div>
            </Card>

            <Card className="p-4 border-2 border-secondary/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-secondary/20">
                  <Award className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Expérience</p>
                  <p className="font-semibold text-sm">{data.experience}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-2 border-secondary/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-secondary/20">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Profil risque</p>
                  <p className="font-semibold text-sm">{data.riskAppetite}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Analysis Card */}
          <Card className="p-8 mb-8 border-2 border-secondary/30 bg-gradient-to-br from-secondary/5 to-bnp-dark-green/5 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-start gap-3 mb-6">
              <div className="p-3 rounded-lg bg-secondary/20">
                <Sparkles className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Analyse BNP Private Banking</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {getProfileAnalysis()}
                </p>
              </div>
            </div>

            {/* Key Info */}
            <div className="grid md:grid-cols-2 gap-4 mt-6 pt-6 border-t">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-secondary" />
                  <p className="text-sm font-medium">Objectif principal</p>
                </div>
                <p className="text-sm text-muted-foreground">{data.mainGoal}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-secondary" />
                  <p className="text-sm font-medium">Préoccupation majeure</p>
                </div>
                <p className="text-sm text-muted-foreground">{data.mainChallenge}</p>
              </div>
            </div>

            {/* Asset Categories */}
            {data.assetCategories && data.assetCategories.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm font-medium mb-3">Catégories d'actifs sélectionnées</p>
                <div className="flex flex-wrap gap-2">
                  {data.assetCategories.map((category, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Recommendations */}
          <Card className="p-8 mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-xl font-bold mb-6">Recommandations personnalisées</h3>
            <div className="space-y-4">
              {getRecommendations().map((rec, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-secondary" />
                  </div>
                  <p className="text-sm leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* CTAs */}
          <div className="grid md:grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Card className="p-6 bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10 border-2 border-secondary/30 hover:shadow-premium transition-all group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Shield className="w-10 h-10 text-secondary mb-4 relative" />
              <h3 className="font-bold text-lg mb-2 relative">Accéder à mon espace</h3>
              <p className="text-sm text-muted-foreground mb-4 relative">
                Créez votre compte et commencez à piloter votre patrimoine
              </p>
              <Button 
                onClick={() => navigate("/dashboard")}
                className="w-full bg-secondary hover:bg-bnp-dark-green relative"
              >
                Créer mon compte
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Card>

            <Card className="p-6 border-2 hover:shadow-card transition-all">
              <Target className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">Conseiller dédié</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Échangez avec un expert BNP Paribas Wealth Management
              </p>
              <Button 
                variant="outline"
                className="w-full border-2"
              >
                Prendre rendez-vous
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSummary;
