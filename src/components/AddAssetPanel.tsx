import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { 
  Home, 
  TrendingUp, 
  PiggyBank, 
  Shield, 
  Bitcoin, 
  Wallet,
  Building2,
  Briefcase,
  CreditCard,
  FileText,
  Landmark,
  BookOpen,
  DollarSign,
  Rocket,
  Users,
  Watch,
  Gem,
  MoreHorizontal
} from "lucide-react";

interface AddAssetPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const assetCategories = [
  {
    icon: Home,
    title: "Immobilier",
    description: "Immobilier physique & commercial ainsi que toutes les SCPI françaises.",
    color: "text-blue-500"
  },
  {
    icon: TrendingUp,
    title: "Actions & Fonds",
    description: "Synchronisation sécurisée pour PEA, Assurance Vie, Compte-Titres et plus encore.",
    color: "text-green-500"
  },
  {
    icon: PiggyBank,
    title: "PEA",
    description: "Synchronisation sécurisée et suivi automatique de votre PEA et PEA-PME.",
    color: "text-emerald-500"
  },
  {
    icon: Shield,
    title: "Assurance Vie",
    description: "Contrats d'assurance vie des grandes compagnies en France, Luxembourg ou Belgique.",
    color: "text-purple-500"
  },
  {
    icon: Bitcoin,
    title: "Exchange Crypto",
    description: "Synchronisation sécurisée des exchanges via clés API en lecture seule.",
    color: "text-orange-500"
  },
  {
    icon: Bitcoin,
    title: "Crypto",
    description: "Synchronisation des principaux exchanges, ajout d'adresses ou manuel.",
    color: "text-amber-500"
  },
  {
    icon: Wallet,
    title: "Wallets Crypto",
    description: "Synchronisez Ledger, Metamask et d'autres wallets pour les principales blockchains.",
    color: "text-yellow-500"
  },
  {
    icon: Building2,
    title: "SCPI",
    description: "Suivi automatique de la valorisation de toutes les SCPI du marché.",
    color: "text-indigo-500"
  },
  {
    icon: CreditCard,
    title: "Comptes bancaires",
    description: "Synchronisation sécurisée pour plus de 20 000 banques à travers le monde.",
    color: "text-cyan-500"
  },
  {
    icon: Briefcase,
    title: "Comptes-titres",
    description: "Compte-Titres synchronisable et suivi automatique de vos investissements.",
    color: "text-teal-500"
  },
  {
    icon: Users,
    title: "Épargne salariale",
    description: "PEE, PEG, PER Entreprise, PERCO et dispositifs courants d'épargne salariale.",
    color: "text-pink-500"
  },
  {
    icon: BookOpen,
    title: "Livrets",
    description: "Livret A, LDD, livret populaire, livrets boostés, comptes à terme.",
    color: "text-rose-500"
  },
  {
    icon: FileText,
    title: "Emprunts",
    description: "Prêts amortissables, in fine, avec différé partiel ou total.",
    color: "text-red-500"
  },
  {
    icon: Rocket,
    title: "Startups & PME",
    description: "Titres non cotés, startups françaises et étrangères.",
    color: "text-violet-500"
  },
  {
    icon: DollarSign,
    title: "Crowdlending",
    description: "Synchronisation ou ajout manuel de vos investissements en crowdlending.",
    color: "text-lime-500"
  },
  {
    icon: Watch,
    title: "Montres",
    description: "Suivi de vos investissements alternatifs et exotiques dans une catégorie dédiée.",
    color: "text-sky-500"
  },
  {
    icon: Gem,
    title: "Métaux précieux",
    description: "Or, argent, palladium et autres, avec suivi détaillé.",
    color: "text-amber-600"
  },
  {
    icon: MoreHorizontal,
    title: "Autres actifs",
    description: "Catégorie pour tous les actifs exotiques et alternatifs.",
    color: "text-slate-500"
  },
];

const AddAssetPanel = ({ open, onOpenChange }: AddAssetPanelProps) => {
  const handleCardClick = (title: string) => {
    console.log("Selected asset:", title);
    // Pour le prototype, on peut juste logger ou afficher un toast
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold">
            Que souhaitez-vous ajouter à votre patrimoine ?
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-2">
            Suivez l'ensemble de votre patrimoine depuis cette interface. Sélectionnez la catégorie d'actif que vous souhaitez ajouter.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-4 overflow-y-auto max-h-[calc(85vh-140px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {assetCategories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <Card
                  key={idx}
                  onClick={() => handleCardClick(category.title)}
                  className="p-4 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border-2 hover:border-secondary/50 group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-muted/50 group-hover:bg-secondary/10 transition-colors ${category.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1 group-hover:text-secondary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAssetPanel;
