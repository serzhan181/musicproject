import { TracksSection } from "@/components/sections/tracks-section";
import { SongCard } from "@/components/song-card";
import { Carousel } from "@/components/ui/carousel";
import { sc } from "@/config/soundcloud";

export default async function Home() {
  const tracks = await sc.tracks.searchV2({ q: "" });
  const workoutTracks = await sc.tracks.searchV2({ q: "workout" });
  const chillTracks = await sc.tracks.searchV2({ q: "lofi|relax|jazz" });

  return (
    <div className="flex flex-col gap-5">
      <TracksSection tracks={tracks.collection} title="Popular." />
      <TracksSection
        tracks={chillTracks.collection}
        title="Lofi, Focus, Chill."
      />
      <TracksSection tracks={workoutTracks.collection} title="Workout." />
    </div>
  );
}
