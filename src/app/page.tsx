import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { TopProjects } from "@/components/TopProjects";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <TopProjects />
      <Features />

      <CTA />

    </div>
  );
};

export default Index;
