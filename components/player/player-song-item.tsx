import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface PlayerSongItemProps {
  image?: string;
  title?: string;
  username?: string;
  maxW?: number;
  active?: boolean;
  className?: string;
}

export const PlayerSongItem = ({
  image,
  title,
  username,
  maxW = 130,
  active,
  className,
}: PlayerSongItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center w-full gap-2",
        {
          "bg-secondary": active,
        },
        className
      )}
    >
      <div className="relative overflow-hidden border w-9 border-border">
        {active && (
          <Image
            src="/assets/svgs/equalizer.svg"
            alt="equalizer"
            width={20}
            height={20}
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary top-1/2 left-1/2"
          />
        )}
        <AspectRatio ratio={1}>
          <Image
            src={image || "/assets/agents/reyna.webp"}
            alt={title || "U"}
            fill
          />
        </AspectRatio>
      </div>

      <div>
        <h6
          className="overflow-hidden text-xs leading-none tracking-tight whitespace-nowrap text-ellipsis"
          style={{ maxWidth: maxW }}
        >
          {title}
        </h6>
        <span
          className="inline-block overflow-hidden text-xs leading-none tracking-tight text-muted-foreground whitespace-nowrap text-ellipsis"
          style={{ maxWidth: maxW }}
        >
          {username}
        </span>
      </div>
    </div>
  );
};
