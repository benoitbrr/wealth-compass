import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone } from "lucide-react";
import AppointmentModal from "@/components/AppointmentModal";

const AdvisorContactTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="p-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-6">
            <Phone className="w-8 h-8 text-secondary" />
          </div>
          
          <h3 className="text-2xl font-bold mb-4">
            Échangez avec un expert BNP Private Banking
          </h3>
          
          <p className="text-muted-foreground mb-8">
            Vous souhaitez échanger directement avec un expert BNP Private Banking pour structurer votre patrimoine ? Planifiez un rendez-vous personnalisé.
          </p>

          <Button 
            onClick={() => setIsModalOpen(true)}
            size="lg"
            className="bg-primary hover:bg-bnp-dark-green text-white px-8"
          >
            Contacter un conseiller
          </Button>
        </div>
      </Card>

      <AppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default AdvisorContactTab;
