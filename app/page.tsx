import { SongCard } from "@/components/song-card";
import { sc } from "@/config/soundcloud";

export default async function Home() {
  const tracks = await sc.tracks.searchV2({ q: "crystals moon" });

  return (
    <div className="grid gap-3 sm:grid-cols-2 xs:grid-cols-1 md:grid-cols-4">
      {tracks.collection.map((t) => (
        <SongCard
          key={t.id}
          authorName={t.user.username}
          id={t.id}
          thumbnailUrl={
            t?.artwork_url?.replace("large", "t500x500") ||
            "/assets/images/agents/reyna.webp"
          }
          title={t.title}
          songUrl={t.permalink_url}
        />
      ))}
    </div>
  );
}
