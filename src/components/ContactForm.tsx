import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    projectDescription: "",
    budgetRange: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("project_inquiries").insert({
        project_description: formData.projectDescription,
        budget_range: formData.budgetRange,
        email: formData.email,
      });

      if (error) throw error;

      toast({
        title: "Zapytanie otrzymane!",
        description: "Odpowiemy w ciągu 24 godzin z Twoją wyceną opartą na AI.",
      });

      setFormData({
        projectDescription: "",
        budgetRange: "",
        email: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Błąd",
        description: "Nie udało się wysłać zapytania. Spróbuj ponownie.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Darmowa Wycena</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Otrzymaj <span className="text-primary">Wycenę AI</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Opowiedz nam o swoim projekcie, a pokażemy Ci, ile możesz zaoszczędzić
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 md:p-10 border border-border shadow-card">
          <div className="space-y-6">
            {/* Project Description */}
            <div>
              <label htmlFor="projectDescription" className="block text-sm font-semibold text-foreground mb-2">
                Opis Projektu
              </label>
              <Textarea
                id="projectDescription"
                placeholder="Opisz swój pomysł na projekt, funkcjonalności i cele..."
                value={formData.projectDescription}
                onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                required
                className="min-h-[120px] resize-none"
              />
            </div>

            {/* Budget Range */}
            <div>
              <label htmlFor="budgetRange" className="block text-sm font-semibold text-foreground mb-2">
                Zakres Budżetu
              </label>
              <Select
                value={formData.budgetRange}
                onValueChange={(value) => setFormData({ ...formData, budgetRange: value })}
                required
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Wybierz zakres budżetu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5000-10000">5 000 - 10 000 PLN</SelectItem>
                  <SelectItem value="10000-25000">10 000 - 25 000 PLN</SelectItem>
                  <SelectItem value="25000-50000">25 000 - 50 000 PLN</SelectItem>
                  <SelectItem value="50000+">50 000+ PLN</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                Adres Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="twoj@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-12"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full h-14 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                  Przetwarzanie...
                </>
              ) : (
                <>
                  Otrzymaj Wycenę AI
                  <Send className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </div>

          {/* Trust note */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Bez zobowiązań. Odpowiadamy w ciągu 24 godzin.
          </p>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;