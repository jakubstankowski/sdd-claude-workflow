import Hero from "@/components/Hero";
import ComparisonSection from "@/components/ComparisonSection";
import AIAgentsSection from "@/components/AIAgentsSection";
import HomePageBlogSection from "@/components/HomePageBlogSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <ComparisonSection />
      <AIAgentsSection />
      <HomePageBlogSection />
      <ContactForm />
      <Footer />
    </main>
  );
};

export default Index;
