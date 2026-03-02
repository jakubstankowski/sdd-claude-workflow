import { Check, X, Users, Bot, Clock, Zap, Banknote, TrendingDown } from "lucide-react";

const ComparisonSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            <span className="text-primary">Rewolucja</span> w Branży
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Zobacz, jak agenci AI zmieniają ekonomię tworzenia oprogramowania
          </p>
        </div>

        {/* Comparison table */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Traditional Software House */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <Users className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Tradycyjny Software House</h3>
                <p className="text-sm text-muted-foreground">Stary sposób</p>
              </div>
            </div>

            <div className="space-y-4">
              <ComparisonRow 
                icon={<Users className="w-5 h-5" />}
                label="Wielkość zespołu"
                value="5+ osób"
                negative
              />
              <ComparisonRow 
                icon={<Clock className="w-5 h-5" />}
                label="Czas realizacji"
                value="4 miesiące"
                negative
              />
              <ComparisonRow 
                icon={<Banknote className="w-5 h-5" />}
                label="Koszt"
                value="80 000 PLN"
                negative
                highlight
              />
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-muted-foreground">
                <X className="w-5 h-5 text-destructive" />
                <span className="text-sm">Wysokie koszty ogólne</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mt-2">
                <X className="w-5 h-5 text-destructive" />
                <span className="text-sm">Opóźnienia w koordynacji</span>
              </div>
            </div>
          </div>

          {/* aplikacjawai.pl */}
          <div className="bg-card rounded-2xl p-8 border-2 border-primary shadow-elevated relative overflow-hidden">
            {/* Highlight badge */}
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              REKOMENDOWANE
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">aplikacjawai.pl</h3>
                <p className="text-sm text-primary font-semibold">Rewolucja AI</p>
              </div>
            </div>

            <div className="space-y-4">
              <ComparisonRow 
                icon={<Bot className="w-5 h-5" />}
                label="Wielkość zespołu"
                value="1 Dev + Agenci AI"
                positive
              />
              <ComparisonRow 
                icon={<Zap className="w-5 h-5" />}
                label="Czas realizacji"
                value="4 tygodnie"
                positive
              />
              <ComparisonRow 
                icon={<TrendingDown className="w-5 h-5" />}
                label="Koszt"
                value="8 000 PLN"
                positive
                highlight
              />
            </div>

            <div className="mt-8 pt-6 border-t border-primary/20">
              <div className="flex items-center gap-2 text-foreground">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">90% redukcja kosztów</span>
              </div>
              <div className="flex items-center gap-2 text-foreground mt-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">4x szybsza realizacja</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ComparisonRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  positive?: boolean;
  negative?: boolean;
  highlight?: boolean;
}

const ComparisonRow = ({ icon, label, value, positive, negative, highlight }: ComparisonRowProps) => (
  <div className={`flex items-center justify-between p-4 rounded-xl ${highlight ? 'bg-background/50' : 'bg-background/30'}`}>
    <div className="flex items-center gap-3">
      <div className={`${positive ? 'text-primary' : 'text-muted-foreground'}`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
    <span className={`font-bold ${highlight ? 'text-lg' : 'text-base'} ${positive ? 'text-primary' : negative ? 'text-foreground' : 'text-foreground'}`}>
      {value}
    </span>
  </div>
);

export default ComparisonSection;