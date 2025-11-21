import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, TrendingUp, Shield, Sparkles } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();
  const [age, setAge] = useState([35]);
  const [risk, setRisk] = useState([50]);
  const [horizon, setHorizon] = useState([10]);

  const handleStart = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">BNP Paribas Wealth Management</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            E-Private Next Gen
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visualisez et pilotez votre patrimoine en toute autonomie avec l'expertise BNP Paribas
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Card className="p-6 border-2 hover:border-primary/20 transition-all hover:shadow-lg">
            <TrendingUp className="w-10 h-10 text-secondary mb-4" />
            <h3 className="font-semibold mb-2">Vision 360°</h3>
            <p className="text-sm text-muted-foreground">
              Tous vos actifs consolidés en temps réel
            </p>
          </Card>
          <Card className="p-6 border-2 hover:border-primary/20 transition-all hover:shadow-lg">
            <Sparkles className="w-10 h-10 text-secondary mb-4" />
            <h3 className="font-semibold mb-2">Insights IA</h3>
            <p className="text-sm text-muted-foreground">
              Recommandations personnalisées intelligentes
            </p>
          </Card>
          <Card className="p-6 border-2 hover:border-primary/20 transition-all hover:shadow-lg">
            <Shield className="w-10 h-10 text-secondary mb-4" />
            <h3 className="font-semibold mb-2">Expertise BNP</h3>
            <p className="text-sm text-muted-foreground">
              L'excellence du Private Banking digital
            </p>
          </Card>
        </div>

        {/* Onboarding Form */}
        <Card className="p-8 border-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-2xl font-bold mb-6">Personnalisez votre expérience</h2>
          
          <div className="space-y-8">
            {/* Age */}
            <div>
              <Label className="text-base mb-3 block">Votre âge : {age[0]} ans</Label>
              <Slider
                value={age}
                onValueChange={setAge}
                min={18}
                max={80}
                step={1}
                className="w-full"
              />
            </div>

            {/* Risk Appetite */}
            <div>
              <Label className="text-base mb-3 block">
                Appétence au risque : {risk[0] < 33 ? "Prudent" : risk[0] < 66 ? "Équilibré" : "Dynamique"}
              </Label>
              <Slider
                value={risk}
                onValueChange={setRisk}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            {/* Investment Horizon */}
            <div>
              <Label className="text-base mb-3 block">Horizon de placement : {horizon[0]} ans</Label>
              <Slider
                value={horizon}
                onValueChange={setHorizon}
                min={1}
                max={30}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          <Button 
            onClick={handleStart}
            className="w-full mt-8 h-12 text-base group"
            size="lg"
          >
            Découvrir mon patrimoine
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Données sécurisées et conformes RGPD • Support expert disponible 24/7
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
