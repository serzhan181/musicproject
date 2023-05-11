"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGroup, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = {
  "/": {
    name: "Explore",
  },
  "/search": {
    name: "Search",
  },
  "/lofi-live": {
    name: "Live lofi",
  },
};

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  return (
    <LayoutGroup>
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        {...props}
      >
        {Object.entries(navItems).map(([path, { name }]) => {
          const isActive = path === pathname;
          return (
            <Link
              key={path}
              href={path}
              className={cn(
                "px-2 py-1 text-sm font-medium relative transition-colors hover:text-primary/50 text-primary-foreground",
                {
                  "text-primary": isActive,
                  "text-muted-foreground": !isActive,
                }
              )}
            >
              <span>
                {name}
                {isActive ? (
                  <motion.div
                    className="absolute inset-0 bg-muted rounded-sm z-[-1]"
                    layoutId="sidebar"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                ) : null}
              </span>
            </Link>
          );
        })}
      </nav>
    </LayoutGroup>
  );
}
