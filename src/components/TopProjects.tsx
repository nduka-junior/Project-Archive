"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getTopProjects } from "@/lib/profile/profile-actions";

export const TopProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch top projects once when component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getTopProjects();
        setProjects(res ?? []);
      } catch (err: any) {
        console.error("Error fetching top projects:", err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    // fetchProjects();
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20 text-muted-foreground">
        Loading top projects...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center py-20 text-destructive">
        {error}
      </div>
    );

  return projects.length > 0 ? (
    <section className="relative py-24 px-4 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Top Projects
            <span className="gradient-text block mt-2">This Month</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the most innovative and impactful student projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 animate-slide-up">
          {projects.map((project: any, index: number) => (
            <Card
              key={project.id}
              className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 glow-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient hover background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity`}
              />

              <div className="relative p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      by {project.user?.name ?? "Anonymous"}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag: string) => (
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
                    X
                    <span className="font-medium">
                      {project.likes ?? 0} likes
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {project.githubLink && (
                      <Link href={project.githubLink} target="_blank">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 group-hover:bg-primary/10 transition-colors"
                        >
                          <Github className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                    {project.webLink && (
                      <Link href={project.webLink} target="_blank">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 group-hover:bg-primary/10 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center border-2 border-primary/30 bg-background/50
              backdrop-blur-sm text-[15px] px-5 py-2 rounded-md text-foreground
              hover:bg-primary/10 hover:border-primary/50 transition-all group"
            aria-label="View all projects"
          >
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  ) : null;
};
