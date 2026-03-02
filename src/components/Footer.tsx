import { Bot, Mail, MapPin } from "lucide-react";
import jakubPhoto from "@/assets/jakub-photo.webp";

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Founder Section */}
        <div className="mb-12 p-6 rounded-2xl bg-card border border-border">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img 
              src={jakubPhoto} 
              alt="Jakub Stankowski - Founder & AI Senior Developer" 
              className="w-24 h-24 rounded-full object-cover border-2 border-primary shadow-lg"
            />
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-foreground mb-1">Jakub Stankowski</h3>
              <p className="text-sm text-primary font-medium mb-3">Founder & AI Senior Developer</p>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                Założyciel aplikacjawai.pl z <span className="font-semibold text-foreground">8-letnim doświadczeniem</span> w branży IT i 
                ponad <span className="font-semibold text-foreground">30 zrealizowanymi projektami</span>. 
                Codziennie wykorzystuję najnowsze narzędzia AI — GitHub Copilot, Cursor, Claude Agents i wiele innych — 
                aby dostarczać oprogramowanie szybciej i taniej. Moja misja to demokratyzacja dostępu do wysokiej jakości software'u.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">aplikacjawai.pl</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Software House napędzany inteligencją, nie kosztami ogólnymi. Budujemy przyszłość developmentu.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Szybkie Linki</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Jak To Działa
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cennik
                </a>
              </li>
              <li>
                <a href="#contact-form" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Otrzymaj Wycenę
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@aplikacjawai.pl" className="hover:text-primary transition-colors">
                  hello@aplikacjawai.pl
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Polska, UE</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} aplikacjawai.pl. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Polityka Prywatności
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Regulamin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;