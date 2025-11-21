import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Share2, 
  FileText, 
  Eye, 
  Bell,
  Sparkles,
  Plus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProfilePanel from "./ProfilePanel";
import AddAssetPanel from "./AddAssetPanel";

const HeaderBand = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);

  return (
    <>
      <header className="h-16 border-b bg-gradient-to-r from-background via-background to-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 backdrop-blur-xl sticky top-0 z-50 shadow-md flex-shrink-0">
        <div className="h-full px-6 flex items-center justify-end gap-3">
          
          {/* Bouton Premium */}
          <Button 
            variant="ghost"
            className="h-9 px-4 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-amber-500 dark:from-purple-500 dark:via-violet-500 dark:to-amber-400 text-white hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 mr-2" />
            <span className="text-xs">PLUS</span>
            <span className="hidden sm:inline text-xs ml-1.5">Activer mon essai premium</span>
          </Button>

          {/* Icônes centrales */}
          <div className="flex items-center gap-2 ml-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="w-9 h-9 hover:bg-muted/50 transition-all duration-200"
            >
              <Share2 className="w-4 h-4 text-foreground/70 hover:text-foreground" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon"
              className="w-9 h-9 hover:bg-muted/50 transition-all duration-200"
            >
              <FileText className="w-4 h-4 text-foreground/70 hover:text-foreground" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon"
              className="w-9 h-9 hover:bg-muted/50 transition-all duration-200"
            >
              <Eye className="w-4 h-4 text-foreground/70 hover:text-foreground" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon"
              className="w-9 h-9 hover:bg-muted/50 transition-all duration-200 relative"
            >
              <Bell className="w-4 h-4 text-foreground/70 hover:text-foreground" />
              <Badge className="absolute -top-0.5 -right-0.5 w-4 h-4 p-0 flex items-center justify-center bg-destructive text-[9px] font-bold">
                15
              </Badge>
            </Button>
          </div>

          {/* Bouton Compléter mon patrimoine */}
          <Button 
            onClick={() => setIsAddAssetOpen(true)}
            className="h-9 px-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 text-white hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium ml-2"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            <span className="text-xs hidden sm:inline">Compléter mon patrimoine</span>
            <span className="text-xs sm:hidden">Ajouter</span>
          </Button>

          {/* Avatar Profil */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsProfileOpen(true)}
            className="relative rounded-full hover:bg-muted/50 w-9 h-9 ml-2 ring-2 ring-secondary/20 hover:ring-secondary/40 transition-all duration-300"
          >
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-secondary/20 text-secondary font-semibold text-xs">
                AA
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </header>

      {/* Panels */}
      <ProfilePanel open={isProfileOpen} onOpenChange={setIsProfileOpen} />
      <AddAssetPanel open={isAddAssetOpen} onOpenChange={setIsAddAssetOpen} />
    </>
  );
};

export default HeaderBand;
