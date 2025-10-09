import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileClient from "./ProfileClient";
import { getUserProfile } from "@/lib/profile/profile-actions";

async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const profile = await getUserProfile();
  if (!session) {
    redirect("/auth");
  }
  return <ProfileClient session={session} profile={profile} />;
}

export default page;
