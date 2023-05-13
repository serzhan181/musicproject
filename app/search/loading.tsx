import { LoadingSkeleton } from "./_components/skeleton";

export default function SearchLoading() {
  return (
    <div className="grid w-full gap-5 bg-slate-600 sm:grid-cols-2 xs:grid-cols-1 md:grid-cols-4">
      <LoadingSkeleton />
    </div>
  );
}
