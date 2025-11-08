"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "../../generated/prisma"; // adjust path as needed
import { auth } from "@/lib/auth"; // your NextAuth or custom auth
import { headers } from "next/headers";

// ✅ Define validation schema for the form
const profileSchema = z.object({
  github: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  website: z.string().optional(),
});

const prisma = new PrismaClient();

export async function updateProfileAction(values: {
  github?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}) {
  try {
    // ✅ Get the logged-in user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.email) {
      throw new Error("Unauthorized");
    }

    // ✅ Validate input
    const validated = profileSchema.parse(values);

    // ✅ Get current user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) throw new Error("User not found");

    // ✅ Upsert profile record
    await prisma.profile.upsert({
      where: { userId: user.id },
      update: validated,
      create: { ...validated, userId: user.id },
    });

    // ✅ Revalidate relevant pages (optional)
    revalidatePath("/");

    return { success: true };
  } catch (error: any) {
    console.error("❌ Update profile failed:", error);
    return { success: false, message: error.message };
  }
}


export async function getUserProfile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  });

  return user?.profile ?? null;
}


export const getTopProjects = async () => {
  try {
    const projects = await prisma.project.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });
    return projects;
  } catch (error) {
    console.error("Error fetching top projects:", error);
    return [];
  }
};