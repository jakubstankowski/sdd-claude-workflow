import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Linkedin, Bot, Rocket } from "lucide-react";
import jakubPhoto from "@/assets/jakub-photo.webp";

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float animation-delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Left side - Main content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-8 animate-slide-up">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Nowoczesne Tworzenie Oprogramowania</span>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6 animate-slide-up animation-delay-100">
              Stwórz oprogramowanie{" "}
              <span className="text-primary">10x taniej</span>
              <br />
              z zespołem AI
            </h1>

            {/* Sub-headline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed animate-slide-up animation-delay-200">
              Jeden Senior Developer zarządzający wyspecjalizowanymi Agentami AI zamiast drogiej armii pracowników.{" "}
              <span className="font-semibold text-foreground">Najwyższa jakość za ułamek ceny.</span>
            </p>

            {/* MVP Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-8 animate-slide-up animation-delay-250">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Rocket className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  <span className="text-primary font-bold">MVP w 2-4 tygodnie</span> — od pomysłu do produktu
                </span>
              </div>
            </div>
          </div>

          {/* Right side - Founder Profile */}
          <div className="flex flex-col items-center justify-center gap-6 p-6 md:p-8 rounded-3xl bg-card/80 border border-border backdrop-blur-sm animate-slide-up animation-delay-200 lg:min-w-[380px] lg:max-w-[420px]">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/50 to-primary/30 rounded-full blur-md" />
              <img 
                src={jakubPhoto} 
                alt="Jakub Stankowski - Founder & AI Senior Developer" 
                className="relative w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-primary shadow-2xl"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-background flex items-center justify-center">
                <Bot className="w-3 h-3 text-white" />
              </div>
            </div>
            
            <div className="text-center">
              <p className="font-bold text-foreground text-xl md:text-2xl mb-1">Jakub Stankowski</p>
              <p className="text-sm md:text-base text-primary font-semibold mb-3">Founder & AI Senior Developer</p>
              
              <p className="text-sm text-muted-foreground mb-4 max-w-md leading-relaxed">
                Ekspert AI z <span className="font-semibold text-foreground">8-letnim doświadczeniem</span> w tworzeniu oprogramowania. 
                Specjalizuję się w zarządzaniu zespołami <span className="font-semibold text-foreground">Agentów AI</span> — 
                codziennie pracuję z GitHub Copilot, Cursor, Claude Agents i wieloma innymi narzędziami. 
                Zrealizowałem ponad <span className="font-semibold text-foreground">30 projektów</span> dla klientów z całego świata.
              </p>
              
              <a 
                href="https://www.linkedin.com/in/jakub-stankowski/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <Linkedin className="w-4 h-4" />
                Połącz się na LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* CTA Button - Below both columns */}
        <div className="text-center mt-10 animate-slide-up animation-delay-300">
          <Button 
            size="lg" 
            variant="hero"
            onClick={scrollToForm}
            className="group"
          >
            Wycena Mojego Projektu
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground animate-fade-in animation-delay-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm">Szybka Dostawa MVP</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm">Agenci AI 24/7</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm">Jakość Enterprise</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;