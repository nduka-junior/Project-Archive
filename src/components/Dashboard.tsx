import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { signOut } from "@/lib/auth/auth-actions";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import { Button } from "./ui/button";

type Session = typeof auth.$Infer.Session;

function Dashboard({ session }: { session: Session }) {
  const router = useRouter();
  const user = session.user;

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth");
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
          Dashboard
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              variant="link"
              className="cursor-pointer"
              onClick={handleSignOut}
            >
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default Dashboard;
