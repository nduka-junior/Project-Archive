import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Heart, ExternalLink, Github } from "lucide-react";

// Missing import
import { ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "AI-Powered Study Assistant",
    author: "Sarah Chen",
    department: "Computer Science",
    likes: 342,
    tags: ["AI/ML", "Education", "NLP"],
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 2,
    title: "Smart Campus Navigation",
    author: "Michael Torres",
    department: "Software Engineering",
    likes: 298,
    tags: ["Mobile", "IoT", "React Native"],
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    title: "Blockchain Voting System",
    author: "Priya Sharma",
    department: "Information Systems",
    likes: 276,
    tags: ["Blockchain", "Web3", "Security"],
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: 4,
    title: "Mental Health Chatbot",
    author: "James Wilson",
    department: "Psychology & CS",
    likes: 254,
    tags: ["Healthcare", "AI", "Mobile"],
    gradient: "from-orange-500/20 to-red-500/20",
  },
];

export const TopProjects = () => {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Top Projects
            <span className="gradient-text block mt-2">This Month</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the most innovative and impactful student projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12 animate-slide-up">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 glow-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
              />

              <div className="relative p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      by {project.author} · {project.department}
                    </p>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="group-hover:bg-primary/10 transition-colors"
                  >
                    <Heart className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Heart className="h-4 w-4 fill-current text-primary" />
                    <span className="font-medium">{project.likes} likes</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 group-hover:bg-primary/10 transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 group-hover:bg-primary/10 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary/30 bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/50"
          >
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

