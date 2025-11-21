import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Community = () => {
  const articles = [
    {
      title: "Diversification : les clés pour 2025",
      category: "Stratégie",
      date: "15 Jan 2025",
      readTime: "5 min",
      featured: true
    },
    {
      title: "Private Equity : comprendre les FCPR",
      category: "Expertise",
      date: "12 Jan 2025",
      readTime: "8 min",
      featured: false
    },
    {
      title: "Optimisation fiscale : les nouveautés",
      category: "Fiscalité",
      date: "10 Jan 2025",
      readTime: "6 min",
      featured: false
    },
  ];

  const webinars = [
    {
      title: "Webinar : Investir dans un contexte volatil",
      date: "25 Jan 2025",
      time: "14h00"
    },
    {
      title: "Table ronde : Private Banking 2025",
      date: "02 Fév 2025",
      time: "16h30"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Communauté & Expertise</h1>
        <p className="text-muted-foreground">Contenus éducatifs et insights d'experts BNP</p>
      </div>

      {/* Featured Article */}
      <Card className="p-6 mb-8 bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10 border-2 border-secondary/30 hover:shadow-premium transition-all group cursor-pointer">
        <Badge variant="secondary" className="mb-4">À la une</Badge>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2 group-hover:text-secondary transition-colors">
              {articles[0].title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {articles[0].date}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {articles[0].readTime} de lecture
              </span>
            </div>
            <Button variant="ghost" className="group-hover:text-secondary">
              Lire l'article
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <TrendingUp className="w-16 h-16 text-secondary/20" />
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Articles */}
        <div>
          <h3 className="font-semibold text-xl mb-4">Derniers articles</h3>
          <div className="space-y-4">
            {articles.slice(1).map((article, idx) => (
              <Card key={idx} className="p-4 border-2 hover:border-secondary/30 transition-all cursor-pointer group">
                <Badge variant="outline" className="mb-2 text-xs">{article.category}</Badge>
                <h4 className="font-semibold mb-2 group-hover:text-secondary transition-colors">
                  {article.title}
                </h4>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime} de lecture</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Webinars */}
        <div>
          <h3 className="font-semibold text-xl mb-4">Événements à venir</h3>
          <div className="space-y-4">
            {webinars.map((webinar, idx) => (
              <Card key={idx} className="p-4 border-2 hover:border-secondary/30 transition-all group">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                    <Video className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{webinar.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {webinar.date}
                      </span>
                      <span>•</span>
                      <span>{webinar.time}</span>
                    </div>
                    <Button size="sm" variant="outline" className="mt-3 border-2">
                      S'inscrire
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
