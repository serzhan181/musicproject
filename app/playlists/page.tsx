import { PlaylistCard } from "@/components/playlist-card";
import { sc } from "@/config/soundcloud";

export default async function PlaylistPage() {
  const playlists = await sc.playlists.searchV2({ q: "" });

  return (
    <div className="flex flex-col gap-3">
      {playlists.collection.map((p) => (
        <PlaylistCard
          key={p.id}
          authorName={p.user.username}
          thumbnailUrl={
            p.artwork_url?.replace("large", "t500x500") ||
            "/assets/agents/viper.webp"
          }
          title={p.title}
          firstTrack={p.tracks[0]}
          tracksCount={p.track_count}
          id={p.id}
          // TODO: Complete it
          isPlaying={false}
          onPause={() => {}}
          onPlay={() => {}}
          onPlaySong={() => {}}
          curPlaylistId={0}
        />
      ))}
    </div>
  );
}
