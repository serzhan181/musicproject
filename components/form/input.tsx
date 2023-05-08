import * as React from "react";
import { Label } from "./label";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  status?: "default" | "error";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, id, label, status = "default", helperText, ...props },
    ref
  ) => {
    return (
      <div className="grid w-full items-center gap-1.5">
        {label && <Label htmlFor={id}>{label}</Label>}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border bg-transparent ring-offset-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            {
              "border-input": status === "default",
              "border-destructive focus-visible:ring-destructive/50":
                status === "error",
            },
            className
          )}
          ref={ref}
          id={id}
          {...props}
        />
        {helperText && (
          <p
            className={cn("text-sm", {
              "text-muted-foreground": status === "default",
              "text-destructive": status === "error",
            })}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
