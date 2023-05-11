import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
  return (
    <div className="flex flex-col gap-3">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <Card key={i} className="flex overflow-hidden">
            <div className="w-60 bg-background/50">
              <AspectRatio ratio={1}>
                <Skeleton className="absolute inset-0" />
              </AspectRatio>
            </div>
            <div className="flex flex-col w-full gap-3 p-3">
              <Skeleton className="w-[350px]" />
            </div>
          </Card>
        ))}
    </div>
  );
}
