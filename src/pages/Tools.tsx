import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, FileDown, Settings, Shield, Mail } from "lucide-react";

const Tools = () => {
  const tools = [
    {
      title: "Calculateur fiscal",
      description: "Optimisez votre situation fiscale",
      icon: Calculator,
      action: "Calculer"
    },
    {
      title: "Export patrimonial",
      description: "Téléchargez vos données en PDF/Excel",
      icon: FileDown,
      action: "Exporter"
    },
    {
      title: "Paramètres du compte",
      description: "Gérez vos préférences et notifications",
      icon: Settings,
      action: "Configurer"
    },
    {
      title: "Documents sécurisés",
      description: "Accédez à vos contrats et relevés",
      icon: Shield,
      action: "Consulter"
    },
    {
      title: "Contact conseiller",
      description: "Échangez avec votre expert dédié",
      icon: Mail,
      action: "Contacter"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Outils & Services</h1>
        <p className="text-muted-foreground">Calculateurs et fonctionnalités avancées</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, idx) => (
          <Card key={idx} className="p-6 border-2 hover:border-secondary/30 hover:shadow-premium transition-all group">
            <div className="mb-4">
              <div className="inline-flex p-3 rounded-lg bg-secondary/10 mb-4 group-hover:bg-secondary/20 transition-colors">
                <tool.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{tool.title}</h3>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </div>
            <Button variant="outline" className="w-full border-2 group-hover:border-secondary/50">
              {tool.action}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tools;
