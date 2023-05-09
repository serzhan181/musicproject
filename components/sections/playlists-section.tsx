"use client";

import { SoundcloudPlaylistV2 } from "soundcloud.ts";
import { PlaylistCard } from "../playlist-card";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/use-redux";
import {
  seekToSong,
  setIsPlaying,
  setPlaylist,
} from "@/store/features/player-slice";

interface PlaylistSectionProps {
  playlist: SoundcloudPlaylistV2;
  title: string;
}

export const PlaylistSection = ({ playlist, title }: PlaylistSectionProps) => {
  const dispatch = useDispatch();
  const { isPlaying, curPlaylist, curSong } = useAppSelector(
    (state) => state.player
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          {title}
        </h2>

        <Link
          className="p-0 text-sm font-semibold leading-none tracking-tight underline text-primary underline-offset-4 h-fit"
          href="/"
        >
          See more.
        </Link>
      </div>
      <PlaylistCard
        key={playlist.id}
        authorName={playlist.user.username}
        thumbnailUrl={
          playlist.artwork_url?.replace("large", "t500x500") ||
          "/assets/agents/viper.webp"
        }
        title={playlist.title}
        firstTrack={playlist.tracks[0]}
        tracksCount={playlist.track_count}
        isPlaying={isPlaying}
        onPause={() => dispatch(setIsPlaying(false))}
        onPlay={() => dispatch(setIsPlaying(true))}
        curPlaylistId={curPlaylist?.id}
        id={playlist.id}
        onPlaySong={(songId) => {
          if (curPlaylist?.id !== playlist.id) {
            dispatch(
              setPlaylist({
                id: playlist.id,
                tracks: playlist.tracks,
                artwork_url:
                  playlist.artwork_url || "/assets/agents/reyna.webp",
                username: playlist.user.username,
              })
            );
          } else {
            const idxInPlaylist = curPlaylist.tracks.findIndex(
              (t) => t.id === songId
            );
            dispatch(seekToSong(idxInPlaylist));
          }
        }}
      />
    </div>
  );
};
