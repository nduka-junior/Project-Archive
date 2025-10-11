"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { uploadProjectAction } from "@/lib/project/project-actions";
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
import { Loader2, Upload, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { uploadProjectSchema } from "@/lib/types/UploadTypes";
import { uploadFileToCloudinary } from "@/lib/cloudinary";


export default function UploadProjectClient({ session }: { session: any }) {
  const [isPending, startTransition] = useTransition();
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
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

  
  const onSubmit = (data: z.infer<typeof uploadProjectSchema>) => {
    console.log("Submitting form with data:", data, "and files:", files);
    startTransition(async () => {
      try {
        // ✅ Upload files directly to Cloudinary (avoid body size limit)
        const documentUrl = files.document
          ? await uploadFileToCloudinary(files.document, "project_docs")
          : undefined;

        const presentationUrl = files.presentation
          ? await uploadFileToCloudinary(
              files.presentation,
              "project_presentations"
            )
          : undefined;

        // ✅ Then send only metadata to your server action
        const result = await uploadProjectAction({
          ...data,
          tags,
          documentUrl,
          presentationUrl,
          userId: session?.user?.id, // include if required by Prisma schema
        });

        if (result.success) toast.success(result.message);
        else toast.error(result.message);
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
              {/* Title */}
              <div>
                <Label className="mb-3">Project Title *</Label>
                <Input
                  {...form.register("title")}
                  placeholder="e.g. AI Project Archive"
                />
              </div>

              {/* Description */}
              <div>
                <Label className="mb-3">Description</Label>
                <Textarea
                  {...form.register("description")}
                  placeholder="Brief description..."
                />
              </div>

              {/* Links */}
              <div>
                <Label className="mb-3">Website Link</Label>
                <Input
                  {...form.register("webLink")}
                  placeholder="https://yourproject.com"
                />
              </div>

              <div>
                <Label className="mb-3">GitHub Link</Label>
                <Input
                  {...form.register("githubLink")}
                  placeholder="https://github.com/..."
                />
              </div>

              {/* Document Upload */}
              <div className="space-y-2">
                <Label htmlFor="document">
                  Project Documentation (PDF, DOCX)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="document"
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
                <Label htmlFor="presentation">
                  Project Presentation (PPTX)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="presentation"
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
                <Label className="mb-3">Tags</Label>
                <div className="flex gap-2">
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
              <Button type="submit" disabled={isPending} className="w-full cursor-pointer">
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
