"use client";

import { SoundcloudTrackV2 } from "soundcloud.ts";
import { SongCard } from "../song-card";
import { Carousel } from "../ui/carousel";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/use-redux";
import {
  seekToSong,
  setIsPlaying,
  setPlaylist,
} from "@/store/features/player-slice";

interface TracksSectionProps {
  title: string;
  tracks: SoundcloudTrackV2[];
}

export const TracksSection = ({ tracks, title }: TracksSectionProps) => {
  const dispatch = useDispatch();
  const { curIdx, isPlaying, curSong, curPlaylist } = useAppSelector(
    (state) => state.player
  );

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold leading-none tracking-tight">
        {title}
      </h2>
      <Carousel
        items={tracks.map((t, idx) => (
          <SongCard
            key={t.id}
            authorName={t.user.username}
            id={t.id}
            thumbnailUrl={
              t?.artwork_url?.replace("large", "t500x500") ||
              "/assets/images/agents/reyna.webp"
            }
            title={t.title}
            curSongId={curSong?.id || 0}
            isPlaying={isPlaying}
            onPause={() => dispatch(setIsPlaying(false))}
            onPlay={() => dispatch(setIsPlaying(true))}
            onPlaySong={(songId) => {
              if (curPlaylist?.id !== tracks[0].id) {
                dispatch(
                  setPlaylist({
                    id: tracks[0].id,
                    tracks,
                    artwork_url: tracks[0].artwork_url,
                    username: tracks[0].user.username,
                    idxInPlaylist: idx,
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
        ))}
      />
    </div>
  );
};
