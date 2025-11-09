"use client";
import Link from "next/link";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Dashboard from "./Dashboard";
import SignIn from "./SignIn";
import { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

export const Navbar = ({ session }: { session: Session | null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold gradient-text">
              ProjectArchive
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {session && (
              <>
                <Dashboard session={session} />

                <Link
                  href="/upload-project"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  Upload Project
                </Link>
              </>
            )}

            {!session && <SignIn />}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            {session && (
              <>
                <Dashboard session={session} />

                <Link
                  href="/upload-project"
                  className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  Upload Project
                </Link>
              </>
            )}

            {!session && <SignIn />}
          </div>
        )}
      </div>
    </nav>
  );
};
