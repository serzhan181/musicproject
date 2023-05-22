import { PlaylistSection } from "@/components/sections/playlists-section";
import { TracksSection } from "@/components/sections/tracks-section";
import { sc } from "@/config/soundcloud";

export default async function Home() {
  const tracks = await sc.tracks.searchV2({ q: "phonk" });
  const workoutTracks = await sc.tracks.searchV2({ q: "workout" });
  const chillTracks = await sc.tracks.searchV2({ q: "lofi|relax|jazz" });
  const playlists = await sc.playlists.searchV2({ q: "jazz", limit: 1 });

  return (
    <div className="flex flex-col gap-5">
      <TracksSection tracks={tracks.collection} title="Phonk." />
      <PlaylistSection playlist={playlists.collection[0]} title="Jazz." />
      <TracksSection
        tracks={chillTracks.collection}
        title="Lofi, Focus, Chill."
      />
      <TracksSection tracks={workoutTracks.collection} title="Workout." />
    </div>
  );
}
