import { Card } from "@/components/ui/card";
import { User, Target, Shield, Award } from "lucide-react";

interface ProfileBriefCardProps {
  data: {
    firstName: string;
    age: number | null;
    country: string;
    experience: string;
    riskAppetite: string;
    mainGoal: string;
  };
}

const ProfileBriefCard = ({ data }: ProfileBriefCardProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-secondary/5 to-bnp-dark-green/5 border-secondary/20">
      <h2 className="text-xl font-bold mb-4">Votre profil en bref</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Voici la synthèse de votre profil. Nous allons maintenant vous aider à trouver la stratégie d'investissement qui vous correspond.
      </p>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-secondary/20 flex-shrink-0">
            <User className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Profil</p>
            <p className="font-medium">{data.firstName}, {data.age} ans</p>
            <p className="text-sm text-muted-foreground">{data.country}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-secondary/20 flex-shrink-0">
            <Award className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Expérience</p>
            <p className="font-medium text-sm">{data.experience}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-secondary/20 flex-shrink-0">
            <Shield className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Appétence au risque</p>
            <p className="font-medium text-sm">{data.riskAppetite}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-secondary/20 flex-shrink-0">
            <Target className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Objectif principal</p>
            <p className="font-medium text-sm">{data.mainGoal}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileBriefCard;
