"use client";

import Link from "next/link";
import { MainNav } from "./main-nav";
import { UserNav } from "./user-nav";
import { Home } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { Button } from "../ui/button";

export const Header = () => {
  const { data, status } = useSession();
  return (
    <header className="sticky z-50 border-b">
      <div className="flex items-center h-16 px-4">
        <Logo />
        <MainNav className="mx-6" />
        <div className="flex items-center ml-auto space-x-4">
          {/* TODO: Add in the futute */}
          {/* <Search /> */}
          {status === "authenticated" ? (
            <UserNav
              email={data.user?.email}
              username={data.user?.name || "A"}
              profile_img={data.user?.image}
            />
          ) : (
            <Button onClick={() => signIn()}>Sign in</Button>
          )}
        </div>
      </div>
    </header>
  );
};

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <Home className="w-6" />
      </Link>
    </div>
  );
};
