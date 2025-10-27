"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, Sparkles, Upload, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

import { uploadFileToCloudinary } from "@/lib/cloudinary";
import {
  uploadProjectAction,
  generateProjectMetadata,
} from "@/lib/project/project-actions";
import { uploadProjectSchema } from "@/lib/types/UploadTypes";

export default function UploadProjectClient({ session }: { session: any }) {
  const [isPending, startTransition] = useTransition();
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [files, setFiles] = useState<{ document?: File; presentation?: File }>(
    {}
  );

  const form = useForm<z.infer<typeof uploadProjectSchema>>({
    resolver: zodResolver(uploadProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      webLink: "",
      githubLink: "",
      tags: [],
    },
  });

  /** ✅ Generate tags via server action */
  const handleGenerateTags = async () => {
    const title = form.getValues("title").trim();
    if (!title) return toast.error("Please enter a project title first.");

    setIsGeneratingTags(true);
    try {
      const res = await generateProjectMetadata(title, "tags");
      if (res.success && res.data) {
        const generatedTags = res.data
          .split(",")
          .map((t: string) => t.trim().toLowerCase());
        setTags(generatedTags);
        toast.success("AI-generated tags added!");
      } else {
        toast.error("Failed to generate tags: " + res.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error generating tags.");
    } finally {
      setIsGeneratingTags(false);
    }
  };

  /** ✅ Generate project description via server action */
  const handleGenerateDescription = async () => {
    const title = form.getValues("title").trim();
    if (!title) return toast.error("Please enter a project title first.");

    setIsGeneratingDescription(true);
    try {
      const res = await generateProjectMetadata(title, "description");
      if (res.success) {
        form.setValue("description", res.data);
        toast.success("AI-generated description added!");
      } else {
        toast.error("Failed to generate description: " + res.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error generating description.");
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (t: string) =>
    setTags(tags.filter((tag) => tag !== t));

  const handleFileChange = (key: "document" | "presentation", file?: File) =>
    setFiles((prev) => ({ ...prev, [key]: file }));

  /** ✅ Handle form submit */
  const onSubmit = (data: z.infer<typeof uploadProjectSchema>) => {
    startTransition(async () => {
      try {
        // Upload files to Cloudinary first
        const documentUrl = files.document
          ? await uploadFileToCloudinary(files.document, "project_docs")
          : undefined;

        const presentationUrl = files.presentation
          ? await uploadFileToCloudinary(
              files.presentation,
              "project_presentations"
            )
          : undefined;

        // Then send metadata to your server action
        const result = await uploadProjectAction({
          ...data,
          tags,
          documentUrl,
          presentationUrl,
          userId: session?.user?.id,
        });

        if (result.success) {
          toast.success(result.message);
          form.reset();
          setTags([]);
        } else toast.error(result.message);
      } catch (err) {
        console.error(err);
        toast.error("Failed to upload project.");
      }
    });
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Upload Project</CardTitle>
            <CardDescription>Share your project with others</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Project Title */}
              <div>
                <Label className="mb-4">Project Title *</Label>
                <Input
                  {...form.register("title")}
                  placeholder="e.g. AI Project Archive"
                />
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="">Project Description</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateDescription}
                    disabled={isGeneratingDescription}
                    className="gap-2"
                  >
                    {isGeneratingDescription ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    Generate with AI
                  </Button>
                </div>
                <Textarea
                  {...form.register("description")}
                  placeholder="Brief description..."
                />
              </div>

              {/* Links */}
              <div>
                <Label className="mb-4">Website Link</Label>
                <Input
                  {...form.register("webLink")}
                  placeholder="https://yourproject.com"
                />
              </div>

              <div>
                <Label className="mb-4">GitHub Link</Label>
                <Input
                  {...form.register("githubLink")}
                  placeholder="https://github.com/..."
                />
              </div>

              {/* Document Upload */}
              <div className="space-y-2">
                <Label className="mb-4">
                  Project Documentation (PDF, DOCX)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) =>
                      handleFileChange("document", e.target.files?.[0])
                    }
                  />
                  {files.document && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFileChange("document", undefined)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Presentation Upload */}
              <div className="space-y-2">
                <Label className="mb-4">Project Presentation (PPTX)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept=".ppt,.pptx"
                    onChange={(e) =>
                      handleFileChange("presentation", e.target.files?.[0])
                    }
                  />
                  {files.presentation && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleFileChange("presentation", undefined)
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label>Tags</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateTags}
                    disabled={isGeneratingTags}
                    className="gap-2"
                  >
                    {isGeneratingTags ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    Generate Tags
                  </Button>
                </div>

                <div className="flex gap-2 mt-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), handleAddTag())
                    }
                    placeholder="Add a tag"
                  />
                  <Button type="button" onClick={handleAddTag}>
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full cursor-pointer"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" /> Upload Project
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
