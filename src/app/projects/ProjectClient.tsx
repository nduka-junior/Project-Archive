"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ExternalLink,
  Github,
  Search,
  FileText,
  Presentation,
  Filter,
} from "lucide-react";
import { getAllProjects } from "@/lib/project/project-actions";
import { auth } from "@/lib/auth";
import Link from "next/link";

const sampleProjects = [
  {
    id: "sample-1",
    title: "AI-Powered Student Portal",
    description:
      "A comprehensive portal with AI chatbot assistance for students to manage courses, assignments, and get instant help with queries.",
    tags: ["AI", "React", "Node.js", "MongoDB"],
    webLink: "https://example.com/portal",
    githubLink: "https://github.com/example/portal",
    documentUrl: "https://example.com/portal/document.pdf",
    presentationUrl: "https://example.com/portal/presentation.pdf",
    created_at: "2024-01-15",
  },
];

type Session = typeof auth.$Infer.Session;

export default function Projects({ session }: { session: Session }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getAllProjects();
        if (res.success) {
          setProjects(res.data ?? []);
        } else {
          setProjects(sampleProjects);
        }
      } catch (err) {
        console.error(err);
        setProjects(sampleProjects);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const displayProjects = projects.length ? projects : sampleProjects;

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    displayProjects?.forEach((p) =>
      p.tags?.forEach((t: string) => tags.add(t))
    );
    return Array.from(tags).sort();
  }, [displayProjects]);

  const filteredProjects = useMemo(() => {
    return displayProjects.filter((p) => {
      const matchSearch =
        !searchTerm ||
        p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags?.some((t: string) =>
          t.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchTag = !selectedTag || p.tags?.includes(selectedTag);
      return matchSearch && matchTag;
    });
  }, [displayProjects, searchTerm, selectedTag]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20">
      <main className="w-full max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Student Project Archive
          </h1>
          <p className="text-muted-foreground text-base">
            Discover, explore, and learn from submitted student projects.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 text-lg"
            />
          </div>
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
            >
              All
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        )}

        {/* Project Grid */}
        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground text-lg">
            Loading projects...
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((p) => (
              <Link key={p.id} href={`/projects/${p.id}`}>

                <Card
                  key={p.id}
                  className="hover:shadow-xl transition-all duration-300 flex flex-col justify-between border-primary/10 bg-background/60 backdrop-blur-md"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold mb-1 line-clamp-1">
                      {p.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-sm">
                      {p.description || "No description available"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1 justify-between gap-3">
                    {p.tags && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {p.tags.map((t: string, i: number) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all"
                            onClick={() => setSelectedTag(t)}
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {p.webLink && (
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="flex-1"
                        >
                          <a
                            href={p.webLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" /> Website
                          </a>
                        </Button>
                      )}
                      {p.githubLink && (
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="flex-1"
                        >
                          <a
                            href={p.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 mr-1" /> GitHub
                          </a>
                        </Button>
                      )}
                    </div>

                    {(p.documentUrl || p.presentationUrl) && (
                      <div className="flex gap-2">
                        {p.documentUrl && (
                          <Button
                            size="sm"
                            variant="ghost"
                            asChild
                            className="flex-1"
                          >
                            <a
                              href={p.documentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FileText className="h-4 w-4 mr-1" /> Document
                            </a>
                          </Button>
                        )}
                        {p.presentationUrl && (
                          <Button
                            size="sm"
                            variant="ghost"
                            asChild
                            className="flex-1"
                          >
                            <a
                              href={p.presentationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Presentation className="h-4 w-4 mr-1" /> Slides
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground text-lg">
            No projects found
          </div>
        )}
      </main>
    </div>
  );
}
