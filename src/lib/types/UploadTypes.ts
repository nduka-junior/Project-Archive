import { z } from "zod";

export const uploadProjectSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  webLink: z.string().optional(),
  githubLink: z.string().optional(),
  tags: z.array(z.string()).optional(),
  document: z.any().optional(), // added
  presentation: z.any().optional(), // added
  userId: z.string(),
});

export type UploadProjectInput = {
  title: string;
  description?: string;
  webLink?: string;
  githubLink?: string;
  tags?: string[];
  documentUrl?: string;
  presentationUrl?: string;
  userId: string;
};

// import { z } from "zod";

// export const uploadProjectSchema = z.object({
//   title: z.string().min(3, "Title is required"),
//   description: z.string().optional(),
//   webLink: z.string().url().optional().or(z.literal("")),
//   githubLink: z.string().url().optional().or(z.literal("")),
//   tags: z.array(z.string()).optional(),
//   fileUrl: z.string().optional(),
//   fileName: z.string().optional(),
//   presentationUrl: z.string().optional(),
//   presentationName: z.string().optional(),
// });
