import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Share2, 
  FileText, 
  Eye, 
  Bell,
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
      <header className="h-14 border-b bg-background dark:bg-[#0B1120] sticky top-0 z-50 shadow-sm flex-shrink-0">
        <div className="h-full px-5 flex items-center justify-end gap-2">
          
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
            className="h-9 px-4 rounded-full bg-primary hover:bg-bnp-dark-green text-white transition-all duration-300 shadow-md hover:shadow-lg font-medium ml-3"
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
            className="relative rounded-full hover:bg-muted/50 w-9 h-9 ml-1 ring-2 ring-secondary/20 hover:ring-secondary/40 transition-all duration-300"
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
