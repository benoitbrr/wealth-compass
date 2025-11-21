import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
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
import { usePortfolio } from "@/hooks/usePortfolio";

const HeaderBand = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);
  const { totalAssets, loading } = usePortfolio();
  const [userInitials, setUserInitials] = useState<string>("CB");

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Fetch profile for full name
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
        
        const fullName = profile?.full_name || user.email?.split('@')[0] || "Client BNP";
        
        // Generate initials
        const names = fullName.split(' ');
        const initials = names.length > 1 
          ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
          : fullName.substring(0, 2).toUpperCase();
        setUserInitials(initials);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <header className="h-14 border-b bg-background dark:bg-[#0B1120] sticky top-0 z-50 shadow-sm flex-shrink-0">
        <div className="h-full px-5 flex items-center justify-between gap-2">
          
          {/* Valeur totale des actifs */}
          <div className="hidden lg:flex flex-col items-start">
            <span className="text-[9px] uppercase tracking-wide text-muted-foreground font-medium">
              Valeur totale des actifs
            </span>
            <span className="text-sm font-semibold text-primary">
              {loading ? '...' : `${totalAssets.toLocaleString('fr-FR')} €`}
            </span>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Icônes centrales */}
            <div className="flex items-center gap-2">
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

            {/* Avatar Profil */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsProfileOpen(true)}
              className="relative rounded-full hover:bg-muted/50 w-9 h-9 ml-1 ring-2 ring-secondary/20 hover:ring-secondary/40 transition-all duration-300"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-secondary/20 text-secondary font-semibold text-xs">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </header>

      {/* Panels */}
      <ProfilePanel open={isProfileOpen} onOpenChange={setIsProfileOpen} />
      <AddAssetPanel open={isAddAssetOpen} onOpenChange={setIsAddAssetOpen} />
    </>
  );
};

export default HeaderBand;
