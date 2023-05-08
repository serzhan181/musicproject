import { SongCard } from "@/components/song-card";
import { Carousel } from "@/components/ui/carousel";
import { sc } from "@/config/soundcloud";

export default async function Home() {
  const tracks = await sc.tracks.searchV2({ q: "" });
  const workoutTracks = await sc.tracks.searchV2({ q: "workout" });
  const chillTracks = await sc.tracks.searchV2({ q: "lofi|relax|jazz" });

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-5">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          Popular songs
        </h2>
        <Carousel
          items={tracks.collection.map((t) => (
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
        />
      </div>

      <div className="space-y-5">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          Lofi, Focus, Chill
        </h2>
        <Carousel
          items={chillTracks.collection.map((t) => (
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
        />
      </div>

      <div className="space-y-5">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          Workout
        </h2>
        <Carousel
          items={workoutTracks.collection.map((t) => (
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
        />
      </div>
    </div>
  );
}
