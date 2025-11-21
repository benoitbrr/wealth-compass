import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Calendar as CalendarIcon,
  CheckCircle2,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const AdvisorSection = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedContactMode, setSelectedContactMode] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const advisor = {
    name: "Sophie Dumont",
    title: "Private Banker Senior",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    expertise: ["Gestion de patrimoine", "Stratégies fiscales", "Investissements ESG"],
  };

  const contactModes = [
    { id: "physical", label: "En physique", icon: MapPin, color: "text-secondary" },
    { id: "video", label: "Visioconférence", icon: Video, color: "text-primary" },
    { id: "phone", label: "Téléphone", icon: Phone, color: "text-bnp-dark-green" },
    { id: "chat", label: "Chat privé", icon: MessageSquare, color: "text-accent" },
  ];

  const timeSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const handleBooking = () => {
    if (date && selectedContactMode && selectedTimeSlot) {
      console.log("Booking:", { date, mode: selectedContactMode, time: selectedTimeSlot });
      // Here you would integrate with backend/calendar system
    }
  };

  return (
    <Card className="p-6 border-2 hover:shadow-premium transition-all duration-500 group relative overflow-hidden">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative space-y-6">
        {/* Advisor Info */}
        <div className="flex items-start gap-4">
          <Avatar className="w-20 h-20 ring-2 ring-secondary/20 ring-offset-2 group-hover:ring-secondary/40 transition-all duration-300">
            <AvatarImage src={advisor.photo} alt={advisor.name} />
            <AvatarFallback className="bg-secondary/20">
              <User className="w-8 h-8 text-secondary" />
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div>
              <h3 className="font-bold text-lg group-hover:text-secondary transition-colors duration-300">
                {advisor.name}
              </h3>
              <p className="text-sm text-muted-foreground">{advisor.title}</p>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {advisor.expertise.map((exp, idx) => (
                <Badge 
                  key={idx} 
                  variant="secondary" 
                  className="text-[10px] hover:bg-secondary/30 transition-colors cursor-default"
                >
                  {exp}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Modes */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground">Type de rendez-vous</p>
          <div className="grid grid-cols-2 gap-2">
            {contactModes.map((mode) => {
              const Icon = mode.icon;
              const isSelected = selectedContactMode === mode.id;
              
              return (
                <button
                  key={mode.id}
                  onClick={() => setSelectedContactMode(mode.id)}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-lg border-2 transition-all duration-300",
                    "hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
                    isSelected
                      ? "border-secondary bg-secondary/10 shadow-md"
                      : "border-border bg-card hover:border-secondary/50"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isSelected ? "text-secondary" : mode.color)} />
                  <span className={cn(
                    "text-xs font-medium transition-colors",
                    isSelected ? "text-secondary" : "text-foreground"
                  )}>
                    {mode.label}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-3 h-3 text-secondary ml-auto animate-scale-in" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Calendar Picker */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground">Date du rendez-vous</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-2 hover:border-secondary/50 transition-all duration-300",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date < new Date()}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Slots */}
        {date && selectedContactMode && (
          <div className="space-y-3 animate-fade-in">
            <p className="text-xs font-medium text-muted-foreground">Horaire disponible</p>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((slot) => {
                const isSelected = selectedTimeSlot === slot;
                return (
                  <button
                    key={slot}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={cn(
                      "px-3 py-2 rounded-md text-xs font-medium transition-all duration-200",
                      "hover:scale-105 active:scale-95",
                      isSelected
                        ? "bg-secondary text-primary-foreground shadow-sm"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    )}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Book Button */}
        <Button 
          onClick={handleBooking}
          disabled={!date || !selectedContactMode || !selectedTimeSlot}
          className={cn(
            "w-full border-2 transition-all duration-300",
            date && selectedContactMode && selectedTimeSlot
              ? "bg-secondary hover:bg-bnp-dark-green hover:shadow-premium hover:scale-[1.02]"
              : "opacity-50 cursor-not-allowed"
          )}
        >
          {date && selectedContactMode && selectedTimeSlot ? (
            <>
              <CheckCircle2 className="mr-2 w-4 h-4" />
              Confirmer le rendez-vous
            </>
          ) : (
            <>
              <CalendarIcon className="mr-2 w-4 h-4" />
              Prendre rendez-vous
            </>
          )}
        </Button>

        {/* Quick Chat Link */}
        <button className="w-full text-center text-xs text-muted-foreground hover:text-secondary transition-colors duration-300 flex items-center justify-center gap-1.5 group/chat">
          <MessageSquare className="w-3 h-3 group-hover/chat:animate-pulse" />
          <span className="underline-offset-2 hover:underline">
            Ou démarrer une conversation immédiate
          </span>
        </button>
      </div>
    </Card>
  );
};

export default AdvisorSection;
