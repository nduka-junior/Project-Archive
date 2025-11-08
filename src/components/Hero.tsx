import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Link, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-pulse"
        style={{ animationDuration: "8s" }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary animate-glow-pulse" />
            <span className="text-foreground">
              Showcase Your Academic Excellence
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl">
            Where Student Projects
            <span className="gradient-text block mt-2">Come to Life</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            The ultimate platform for showcasing final year projects. Connect
            with peers, get discovered by recruiters, and celebrate innovation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="/projects"
              className=" flex  items-center text-xl mr-5 hover:text-[#797979] "
            >
              <span> Browse top Projects</span>
              <ArrowRight className="ml-2 h-6 w-6 " />
            </a>

            <a
              href="/upload-project" // <- absolute route with leading slash
              className="inline-flex items-center justify-center border-2 border-primary/30 bg-background/50
                 backdrop-blur-sm text-[15px] px-6 py-3 rounded-md text-foreground
                 hover:bg-primary/10 hover:border-primary/50 transition-all group "
              aria-label="Upload your project"
            >
              <Github className="mr-2 h-5 w-5" />
              Upload Your Project
            </a>
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-3 gap-8 pt-12 w-full max-w-2xl">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                1000+
              </div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                500+
              </div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                50+
              </div>
              <div className="text-sm text-muted-foreground">Universities</div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};
