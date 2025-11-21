import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, ArrowRight, LogIn, Sparkles } from "lucide-react";
import BNPLogo from "@/components/BNPLogo";
import BNPPattern from "@/components/BNPPattern";
import ThemeToggle from "@/components/ThemeToggle";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(158,100%,97%)] dark:bg-background relative flex flex-col">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="container mx-auto flex items-center justify-between">
          <BNPLogo />
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl w-full relative">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full mb-8">
              <Shield className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">BNP Paribas Wealth Management</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-bnp-dark-green bg-clip-text text-transparent tracking-tight leading-tight">
              E-Private Next Gen
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
              La nouvelle expérience patrimoniale digitale<br />pour les clients Private Banking
            </p>
            
            <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>Vision 360° • Insights IA • Expertise BNP</span>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {/* New Users */}
            <Card className="p-8 border-2 border-secondary/30 hover:border-secondary/50 transition-all hover:shadow-premium group bg-gradient-to-br from-secondary/5 to-bnp-dark-green/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/20 rounded-full mb-6">
                  <Sparkles className="w-3 h-3 text-secondary" />
                  <span className="text-xs font-medium text-secondary">Nouveau</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-3">Découvrir mon profil financier</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Un parcours guidé intelligent pour comprendre votre situation et vos objectifs patrimoniaux
                </p>
                
                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">•</span>
                    <span>Analyse personnalisée en 5 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">•</span>
                    <span>Recommandations sur-mesure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">•</span>
                    <span>Accès à votre conseiller dédié</span>
                  </li>
                </ul>
                
                <Button 
                  onClick={() => navigate("/onboarding")}
                  className="w-full h-12 text-base bg-secondary hover:bg-bnp-dark-green group/btn"
                  size="lg"
                >
                  Commencer mon profil
                  <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>

            {/* Existing Clients */}
            <Card className="p-8 border-2 hover:border-primary/30 transition-all hover:shadow-card group relative">
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-6">
                  <Shield className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium text-primary">Client</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-3">Je suis déjà client BNP</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Accédez directement à votre espace personnel et retrouvez votre patrimoine consolidé
                </p>
                
                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Dashboard complet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Suivi en temps réel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Insights & analyses IA</span>
                  </li>
                </ul>
                
                <Button 
                  onClick={() => navigate("/auth")}
                  variant="outline"
                  className="w-full h-12 text-base border-2 hover:bg-primary/5 group/btn"
                  size="lg"
                >
                  <LogIn className="mr-2 w-5 h-5" />
                  Se connecter
                </Button>
              </div>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <Shield className="w-3 h-3" />
              Sécurisé par BNP Paribas • Données chiffrées • Conformité RGPD
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
