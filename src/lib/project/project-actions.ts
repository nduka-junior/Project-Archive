"use server";

import { z } from "zod";
import { PrismaClient } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { UploadProjectInput, uploadProjectSchema } from "../types/UploadTypes";


const prisma = new PrismaClient();

// export async function uploadProjectAction(formData: any) {
//   try {
//     // Authenticate user
//     const session = await auth.api.getSession({
//         headers: await headers(),
//       });
//     if (!session?.user?.id) {
//       throw new Error(
//         "Unauthorized: You must be logged in to upload a project."
//       );
//     }

//     // Validate form data
//     const parsed = uploadProjectSchema.parse(formData);

//     // Upload files if provided
//     let documentUrl: string | undefined;
//     let presentationUrl: string | undefined;

//     if (parsed.document) {
//       const result: any = await uploadToCloudinary(
//         parsed.document,
//         "project_docs"
//       );
//       documentUrl = result.secure_url;
//     }

//     if (parsed.presentation) {
//       const result: any = await uploadToCloudinary(
//         parsed.presentation,
//         "project_presentations"
//       );
//       presentationUrl = result.secure_url;
//     }

//     // Save project in the database
//     await prisma.project.create({
//       data: {
//         title: parsed.title,
//         description: parsed.description,
//         webLink: parsed.webLink,
//         githubLink: parsed.githubLink,
//         tags: parsed.tags || [],
//         documentUrl,
//         presentationUrl,
//         user: {
//           connect: { id: session.user.id }, // ✅ Fix: connect project to the logged-in user
//         },
//       },
//     });

//     return { success: true, message: "Project uploaded successfully!" };
//   } catch (error: any) {
//     console.error("❌ Project upload failed:", error);
//     return { success: false, message: "Upload failed: " + error.message };
//   }
// }

export async function uploadProjectAction(formData: UploadProjectInput) {
  try {
    // ✅ Validate input
    const parsed = uploadProjectSchema.parse(formData);

    // ✅ Save project in database
    await prisma.project.create({
      data: {
        title: parsed.title,
        description: parsed.description,
        webLink: parsed.webLink,
        githubLink: parsed.githubLink,
        tags: parsed.tags || [],
        documentUrl: formData.documentUrl,
        presentationUrl: formData.presentationUrl,
        userId: parsed.userId,
      },
    });

    return { success: true, message: "Project uploaded successfully!" };
  } catch (err: any) {
    console.error("Upload failed:", err);
    return { success: false, message: err.message };
  }
}

export async function generateProjectMetadata(
  title: string,
  type: "tags" | "description"
) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =
      type === "tags"
        ? `Generate 5 short, relevant tags for a software project titled "${title}". Return them as a comma-separated list (no numbering).`
        : `Write a concise, engaging project description (2–3 sentences) for a software project titled "${title}".`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    return text;
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return "Error generating content.";
  }
}
