import { Search, Heart, Users, TrendingUp, Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Search,
    title: "Smart Search & Filters",
    description:
      "Find projects by tags, department, or keywords. Advanced filtering makes discovery effortless.",
  },
  {
    icon: Heart,
    title: "Like & Engage",
    description:
      "Show appreciation for outstanding work. Track trending projects and join the conversation.",
  },
  {
    icon: Users,
    title: "Connect with Creators",
    description:
      "Direct links to GitHub, LinkedIn, and personal portfolios. Network with talented peers.",
  },
  {
    icon: TrendingUp,
    title: "Top 100 Leaderboard",
    description:
      "Discover the most innovative projects. Get featured and gain recognition for your work.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your data is protected. Control what you share and who sees your projects.",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description:
      "Live notifications for likes, comments, and new projects. Stay connected to the community.",
  },
];

export const Features = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Everything You Need to
            <span className="gradient-text block mt-2">
              Showcase Excellence
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built with students in mind. Powerful features to help your projects
            shine.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 glow-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

              <div className="relative space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-glow shadow-lg shadow-primary/25">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>

                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
