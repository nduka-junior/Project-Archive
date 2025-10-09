"use client";

import React, { startTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Twitter, Linkedin, Link as LinkIcon, X } from "lucide-react";
import { toast } from "sonner";
import { auth } from "@/lib/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateProfileAction } from "@/lib/profile/profile-actions";

// ✅ Validation schema
const formSchema = z.object({
  github: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  website: z.string().optional(),
});

type Session = typeof auth.$Infer.Session;

function ProfileClient({
  session,
  profile,
}: {
  session: Session;
  profile?: {
    github?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
    website?: string | null;
  } | null;
}) {
  // ✅ Pre-fill form with existing profile data or empty defaults
  const defaultValues = {
    github: profile?.github || "",
    twitter: profile?.twitter || "",
    linkedin: profile?.linkedin || "",
    website: profile?.website || "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues,
  });

  const isDirty = Object.keys(form.formState.dirtyFields).length > 0;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const res = await updateProfileAction(values);
      if (res.success) {
        toast("✅ Profile information saved successfully.");
        form.reset(values);
      } else {
        toast("❌ An error occurred while saving.");
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account information and social links
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={session.user.name} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input value={session.user.email} disabled />
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>
                  Enter only your username (not the full URL)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        GitHub Username
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. nduka-junior" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <X className="h-4 w-4" />
                        Twitter (X) Username
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. nduka_jr" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn Username
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. nduka-junior" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4" /> Website
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://yourwebsite.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                variant="outline"
                disabled={!isDirty}
                className="cursor-pointer transition-all duration-200 hover:bg-[#ffffff0b] hover:border-white hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
}

export default ProfileClient;