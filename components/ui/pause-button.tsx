import { Pause } from "lucide-react";
import type { ButtonProps } from "./button";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export const PauseButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      className={cn("w-12 h-12 rounded-full", props.className)}
    >
      <Pause />
    </Button>
  );
};
