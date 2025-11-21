import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "assistant" | "user";
  content: string;
  delay?: number;
}

const ChatMessage = ({ role, content, delay = 0 }: ChatMessageProps) => {
  return (
    <div 
      className={cn(
        "flex gap-4 animate-fade-in",
        role === "user" ? "flex-row-reverse" : "flex-row"
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Avatar */}
      <div className={cn(
        "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
        role === "assistant" 
          ? "bg-gradient-to-br from-secondary to-bnp-dark-green" 
          : "bg-primary"
      )}>
        {role === "assistant" ? (
          <Bot className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Bubble */}
      <div className={cn(
        "flex-1 max-w-2xl px-6 py-4 rounded-2xl",
        role === "assistant"
          ? "bg-card border-2 border-border"
          : "bg-gradient-to-br from-secondary/20 to-bnp-dark-green/20 border-2 border-secondary/30"
      )}>
        <p className="text-base leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
