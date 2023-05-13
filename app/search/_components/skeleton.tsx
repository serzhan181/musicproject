import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingSkeleton = () => {
  return (
    <>
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <Card key={i} className="grow">
            <CardHeader className="border-b border-border">
              <div className="flex items-center space-x-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 p-6">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </CardContent>
            <CardFooter className="flex flex-col gap-3 p-6 border-t border-border">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[150px]" />
            </CardFooter>
          </Card>
        ))}
    </>
  );
};
