import { Palette, Code, ShieldCheck, Sparkles, Zap, Clock } from "lucide-react";

const AIAgentsSection = () => {
  return (
    <section className="py-20 px-4 bg-card/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Jak To <span className="text-primary">Działa</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Poznaj naszych wyspecjalizowanych Agentów AI, którzy pracują całą dobę nad Twoim projektem
          </p>
        </div>

        {/* Agent cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <AgentCard
            icon={<Palette className="w-8 h-8" />}
            title="Agent AI UX"
            description="Tworzy oszałamiające prototypy w minuty, nie tygodnie. Przekształca Twoje pomysły w perfekcyjne projekty z najlepszymi wzorcami UX."
            features={["Szybkie prototypowanie", "Design zorientowany na użytkownika", "Podejście mobile-first"]}
            delay="animation-delay-100"
          />
          <AgentCard
            icon={<Code className="w-8 h-8" />}
            title="Agent AI Kodowania"
            description="Pisze czysty, łatwy w utrzymaniu kod z nadludzką prędkością. Automatycznie stosuje najlepsze praktyki i nowoczesne architektury."
            features={["Czysta architektura", "Nowoczesny stack technologiczny", "Skalowalne rozwiązania"]}
            delay="animation-delay-200"
          />
          <AgentCard
            icon={<ShieldCheck className="w-8 h-8" />}
            title="Agent AI QA"
            description="Wykrywa błędy 24/7 zanim trafią na produkcję. Kompleksowe pokrycie testami, które nigdy nie śpi ani nie robi przerw."
            features={["Monitoring 24/7", "Automatyczne wykrywanie błędów", "Skanowanie bezpieczeństwa"]}
            delay="animation-delay-300"
          />
        </div>

        {/* Bottom highlight */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-foreground font-semibold">
              Wszyscy agenci nadzorowani przez Senior Developera
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

interface AgentCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  delay: string;
}

const AgentCard = ({ icon, title, description, features, delay }: AgentCardProps) => (
  <div className={`group bg-card rounded-2xl p-8 border border-border shadow-card hover:shadow-elevated hover:border-primary/50 transition-smooth animate-slide-up ${delay}`}>
    {/* Icon */}
    <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mb-6 text-primary-foreground group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>

    {/* Title */}
    <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>

    {/* Description */}
    <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

    {/* Features */}
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Zap className="w-3 h-3 text-primary" />
          </div>
          <span className="text-sm font-medium text-foreground">{feature}</span>
        </li>
      ))}
    </ul>

    {/* Speed indicator */}
    <div className="mt-6 pt-6 border-t border-border flex items-center gap-2 text-muted-foreground">
      <Clock className="w-4 h-4" />
      <span className="text-sm">Pracuje 24/7 bez przerw</span>
    </div>
  </div>
);

export default AIAgentsSection;