import { auth } from "@/lib/auth";
import { getUserProfile } from "@/lib/profile/profile-actions";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import IdClient from "./IdClient";

async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const profile = await getUserProfile();
  if (!session) {
    redirect("/auth");
  }
  return <IdClient />;
}

export default page;
