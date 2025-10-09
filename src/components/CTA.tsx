import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border-primary/20 backdrop-blur-sm">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl" />

          <div className="relative p-12 md:p-16 space-y-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-glow shadow-lg shadow-primary/25 animate-glow-pulse">
              <Upload className="h-10 w-10 text-primary-foreground" />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">
                Ready to Showcase
                <span className="gradient-text block mt-2">Your Project?</span>
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Join hundreds of students who have already shared their
                incredible work. Get discovered, receive feedback, and build
                your portfolio.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-glow text-lg px-8 py-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all group"
              >
                Upload Your Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/30 bg-background/50 backdrop-blur-sm text-lg px-8 py-6 hover:bg-primary/10 hover:border-primary/50 transition-all"
              >
                Learn More
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
