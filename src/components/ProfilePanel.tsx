import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  User, 
  Link2, 
  Shield, 
  Gift, 
  Users, 
  Youtube, 
  HelpCircle, 
  Newspaper,
  ChevronRight,
  LogOut
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";

interface ProfilePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfilePanel = ({ open, onOpenChange }: ProfilePanelProps) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("Client BNP");
  const [userEmail, setUserEmail] = useState<string>("");
  const [initials, setInitials] = useState<string>("CB");

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUserEmail(user.email || "");
        
        // Fetch profile for full name
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
        
        const fullName = profile?.full_name || user.email?.split('@')[0] || "Client BNP";
        setUserName(fullName);
        
        // Generate initials
        const names = fullName.split(' ');
        const userInitials = names.length > 1 
          ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
          : fullName.substring(0, 2).toUpperCase();
        setInitials(userInitials);
      }
    };

    if (open) {
      fetchUserData();
    }
  }, [open]);

  const menuItems = [
    { icon: User, label: "Mon compte", action: () => navigate("/profile-summary") },
    { icon: Link2, label: "Comptes synchronisés", action: () => {} },
    { 
      icon: Shield, 
      label: "Sécurité", 
      badge: "ACTION REQUISE",
      action: () => {} 
    },
    { icon: Gift, label: "Programme de parrainage", action: () => {} },
    { icon: Users, label: "Communauté", action: () => {} },
    { icon: Youtube, label: "Chaîne Youtube", action: () => {} },
    { icon: HelpCircle, label: "Obtenir de l'aide", action: () => {} },
    { icon: Newspaper, label: "Actualités produit", action: () => {} },
  ];

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Déconnexion réussie");
      onOpenChange(false);
      navigate("/");
    } catch (error) {
      toast.error("Erreur lors de la déconnexion");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-[360px] sm:w-[400px] p-0 flex flex-col bg-card dark:bg-slate-950 border-l border-border"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="text-sm text-muted-foreground font-normal text-left">
            Vue du profil
          </SheetTitle>
        </SheetHeader>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-border">
          <button 
            className="w-full flex items-center gap-3 hover:bg-muted/50 rounded-lg p-3 -m-3 transition-all duration-200 group"
            onClick={() => navigate("/profile-summary")}
          >
            <Avatar className="w-12 h-12 ring-2 ring-secondary/20">
              <AvatarFallback className="bg-secondary/20 text-secondary font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <p className="font-semibold text-sm">{userName}</p>
              <p className="text-xs text-muted-foreground">{userEmail}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-2">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.action}
                className="w-full px-6 py-3 flex items-center gap-3 hover:bg-muted/50 transition-all duration-200 group"
              >
                <Icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="flex-1 text-left text-sm font-medium">
                  {item.label}
                </span>
                {item.badge && (
                  <Badge className="bg-orange-600 dark:bg-orange-700 text-white text-[9px] px-2 py-0.5 font-bold">
                    {item.badge}
                  </Badge>
                )}
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all" />
              </button>
            );
          })}
        </div>

        {/* Footer - Theme & Logout */}
        <div className="px-6 py-4 border-t border-border space-y-2">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-sm font-medium">Thème</span>
            <ThemeToggle />
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 font-medium"
          >
            <LogOut className="w-4 h-4" />
            Se déconnecter
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProfilePanel;
