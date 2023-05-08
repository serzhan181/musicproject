"use client";

import { forwardRef } from "react";
import {
  Avatar as RadixAvatar,
  AvatarFallback as RadixAvatarFallback,
  AvatarImage as RadixAvatarImage,
} from "@radix-ui/react-avatar";
import clsx from "clsx";

interface CustomAvatarProps {
  size?: "md" | "lg";
}

const Avatar = forwardRef<
  React.ElementRef<typeof RadixAvatar>,
  React.ComponentPropsWithoutRef<typeof RadixAvatar> & CustomAvatarProps
>(({ className, size = "md", ...props }, ref) => (
  <RadixAvatar
    ref={ref}
    className={clsx(
      "relative flex shrink-0 overflow-hidden rounded-full",
      {
        "h-6 w-6": size === "md",
        "h-9 w-9": size === "lg",
      },
      className
    )}
    {...props}
  />
));
Avatar.displayName = "Avatar";

const AvatarImage = forwardRef<
  React.ElementRef<typeof RadixAvatarImage>,
  React.ComponentPropsWithoutRef<typeof RadixAvatarImage>
>(({ className, ...props }, ref) => (
  <RadixAvatarImage
    ref={ref}
    className={clsx("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = forwardRef<
  React.ElementRef<typeof RadixAvatarFallback>,
  React.ComponentPropsWithoutRef<typeof RadixAvatarFallback>
>(({ className, ...props }, ref) => (
  <RadixAvatarFallback
    ref={ref}
    className={clsx(
      "flex h-full w-full items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
