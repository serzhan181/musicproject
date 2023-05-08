"use client";

import {
  ComponentPropsWithoutRef,
  HTMLAttributes,
  PropsWithChildren,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CheckboxItem, ItemIndicator } from "@radix-ui/react-dropdown-menu";

export const MultiSelectContent = ({
  children,
  className,
  ...props
}: PropsWithChildren & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn(
        "relative z-50 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MultiSelectGroup = ({
  label,
  children,
}: PropsWithChildren<{ label: string }>) => {
  return (
    <DropdownMenuGroup>
      <div className="pt-2">
        <DropdownMenuLabel>
          <span className="px-4 pb-2 font-medium text-muted-foreground">
            {label}
          </span>
        </DropdownMenuLabel>
        {children}
      </div>
    </DropdownMenuGroup>
  );
};

export const MultiSelect = ({
  placeholder,
  children,
}: PropsWithChildren<{ placeholder: string }>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          <span className="pr-2 text-muted-foreground">{placeholder}</span>
          <ChevronDown />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent asChild align="start" sideOffset={8} side="bottom">
        <MultiSelectContent className="w-full">{children}</MultiSelectContent>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const MultiSelectCheckboxItem = ({
  children,
  checked,
  className,
  ...props
}: PropsWithChildren & ComponentPropsWithoutRef<typeof CheckboxItem>) => {
  return (
    <CheckboxItem
      checked={checked}
      onSelect={(e) => e.preventDefault()}
      textValue=""
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 items-center justify-center">
        <ItemIndicator forceMount>
          {checked && <Check className="w-4 h-4" />}
        </ItemIndicator>
      </span>
      {children}
    </CheckboxItem>
  );
};

MultiSelectCheckboxItem.displayName = "MultiSelectCheckboxItem";
