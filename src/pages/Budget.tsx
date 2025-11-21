import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const Budget = () => {
  const transactions = [
    { label: "Revenus mensuels", amount: 12500, type: "income" },
    { label: "Investissements automatiques", amount: -3000, type: "expense" },
    { label: "Charges fixes", amount: -2800, type: "expense" },
    { label: "Épargne de précaution", amount: -1500, type: "expense" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Budget & Flux financiers</h1>
        <p className="text-muted-foreground">Suivi de vos revenus et dépenses</p>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6 border-2 border-secondary/20">
          <p className="text-sm text-muted-foreground mb-1">Revenus ce mois</p>
          <p className="text-3xl font-bold text-secondary">+12 500 €</p>
        </Card>
        
        <Card className="p-6 border-2">
          <p className="text-sm text-muted-foreground mb-1">Dépenses ce mois</p>
          <p className="text-3xl font-bold text-destructive">-7 300 €</p>
        </Card>

        <Card className="p-6 border-2 border-primary/20">
          <p className="text-sm text-muted-foreground mb-1">Solde disponible</p>
          <p className="text-3xl font-bold">+5 200 €</p>
        </Card>
      </div>

      {/* Transactions */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Flux ce mois</h3>
        <div className="space-y-3">
          {transactions.map((tx, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${tx.type === "income" ? "bg-secondary/20" : "bg-muted"}`}>
                  {tx.type === "income" ? (
                    <ArrowUpRight className="w-4 h-4 text-secondary" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <span className="font-medium">{tx.label}</span>
              </div>
              <span className={`font-semibold ${tx.type === "income" ? "text-secondary" : "text-foreground"}`}>
                {tx.amount >= 0 ? "+" : ""}{tx.amount.toLocaleString("fr-FR")} €
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Budget;
