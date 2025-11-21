import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentModal = ({ isOpen, onClose }: AppointmentModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [wealth, setWealth] = useState("");
  const [channel, setChannel] = useState("");
  const [slot, setSlot] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = () => {
    if (!wealth || !channel || !slot) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      // Reset form
      setWealth("");
      setChannel("");
      setSlot("");
      setComments("");
    }, 2000);
  };

  if (submitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle2 className="w-16 h-16 text-secondary mb-4" />
            <h3 className="text-xl font-bold mb-2">Demande envoyée !</h3>
            <p className="text-center text-muted-foreground">
              Votre demande a bien été transmise. Un conseiller vous contactera prochainement.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Planifier un rendez-vous avec un conseiller BNP Private Banking
          </DialogTitle>
          <DialogDescription>
            Remplissez ce formulaire pour être recontacté rapidement
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="wealth">
              Montant approximatif de votre patrimoine à structurer *
            </Label>
            <Input
              id="wealth"
              placeholder="Ex: 500 000 €"
              value={wealth}
              onChange={(e) => setWealth(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="channel">Préférence de canal *</Label>
            <Select value={channel} onValueChange={setChannel}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un canal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Visioconférence</SelectItem>
                <SelectItem value="phone">Téléphone</SelectItem>
                <SelectItem value="office">En agence</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slot">Créneau souhaité *</Label>
            <Select value={slot} onValueChange={setSlot}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un créneau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lundi-10h">Lundi 10h-11h</SelectItem>
                <SelectItem value="lundi-14h">Lundi 14h-15h</SelectItem>
                <SelectItem value="mardi-9h">Mardi 9h-10h</SelectItem>
                <SelectItem value="mardi-16h">Mardi 16h-17h</SelectItem>
                <SelectItem value="mercredi-11h">Mercredi 11h-12h</SelectItem>
                <SelectItem value="jeudi-10h">Jeudi 10h-11h</SelectItem>
                <SelectItem value="vendredi-14h">Vendredi 14h-15h</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments">
              Précisez vos attentes ou questions (optionnel)
            </Label>
            <Textarea
              id="comments"
              placeholder="Décrivez vos besoins..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-primary hover:bg-bnp-dark-green"
          >
            Demander un rendez-vous
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
