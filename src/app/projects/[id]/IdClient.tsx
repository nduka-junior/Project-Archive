"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProjectById } from "@/lib/project/project-actions";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLink,
  Github,
  FileText,
  Presentation,
  Heart,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function IdClient() {
  const params = useParams();
  const id = params?.id as string;

  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const result = await getProjectById(id);
        setProject(result);
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading project...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Project not found</p>
            <Button asChild className="mt-4">
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Projects
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto">
          <Card className="glow-card">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-3xl">{project.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Submitted on{" "}
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardHeader>

            <Separator />

            <CardContent className="pt-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  About this Project
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description || "No description provided"}
                </p>
              </div>

              <Separator />

              {/* Links */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Project Links</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {project.webLink && (
                    <Button
                      variant="outline"
                      asChild
                      className="h-auto py-3 justify-start"
                    >
                      <a
                        href={project.webLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3"
                      >
                        <ExternalLink className="h-5 w-5 shrink-0" />
                        <div className="text-left">
                          <div className="font-medium">Live Website</div>
                          <div className="text-xs text-muted-foreground">
                            View the project online
                          </div>
                        </div>
                      </a>
                    </Button>
                  )}

                  {project.githubLink && (
                    <Button
                      variant="outline"
                      asChild
                      className="h-auto py-3 justify-start"
                    >
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3"
                      >
                        <Github className="h-5 w-5 shrink-0" />
                        <div className="text-left">
                          <div className="font-medium">Source Code</div>
                          <div className="text-xs text-muted-foreground">
                            View on GitHub
                          </div>
                        </div>
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Files */}
              {(project.documentUrl || project.presentationUrl) && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Project Files
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {project.documentUrl && (
                        <Button
                          variant="outline"
                          asChild
                          className="h-auto py-3 justify-start"
                        >
                          <a
                            href={project.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3"
                          >
                            <FileText className="h-5 w-5 shrink-0" />
                            <div className="text-left">
                              <div className="font-medium">Documentation</div>
                              <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                                View document
                              </div>
                            </div>
                          </a>
                        </Button>
                      )}

                      {project.presentationUrl && (
                        <Button
                          variant="outline"
                          asChild
                          className="h-auto py-3 justify-start"
                        >
                          <a
                            href={project.presentationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3"
                          >
                            <Presentation className="h-5 w-5 shrink-0" />
                            <div className="text-left">
                              <div className="font-medium">Presentation</div>
                              <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                                View slides
                              </div>
                            </div>
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
