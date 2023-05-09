"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { useRef, useState } from "react";
import { useAppSelector } from "@/hooks/use-redux";
import { AnimatePresence, motion } from "framer-motion";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import {
  nextSong,
  prevSong,
  setIsPlaying,
} from "@/store/features/player-slice";
import { secToMinSec } from "@/lib/utils";
import { Controllers } from "./controllers";
import { ProgressRange } from "./progress-range";
import { PopoverPlaylist } from "./popover-playlist";
import { PlayerSongItem } from "./player-song-item";

export const Player = () => {
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const { isPlaying, curSong, curPlaylist } = useAppSelector(
    (state) => state.player
  );

  const [volume, setVolume] = useState(0.3);
  const [duration, setDuration] = useState(0);

  const playerRef = useRef<ReactPlayer>(null);
  return (
    <AnimatePresence>
      {curSong?.songUrl && (
        <>
          <ReactPlayer
            ref={playerRef}
            style={{ display: "none" }}
            playing={isPlaying}
            url={curSong?.songUrl}
            volume={volume}
            onProgress={(state) => {
              setProgress(state.played);
            }}
            onReady={(player) => {
              setDuration(player.getDuration());
            }}
            onEnded={() => {
              console.log("ID ENDED");
              dispatch(nextSong());
            }}
            progressInterval={100}
          />
          <motion.div
            className="sticky bottom-0 left-0 right-0 py-1 transition-all border-t bg-secondary border-border"
            initial={{ y: "100%" }}
            animate={{ y: "0" }}
            exit={{ y: "100%" }}
          >
            <div className="container flex gap-8">
              <Controllers
                volume={volume}
                setVolume={setVolume}
                isPlaying={isPlaying}
                onPause={() => dispatch(setIsPlaying(false))}
                onPlay={() => dispatch(setIsPlaying(true))}
                onNextSong={() => dispatch(nextSong())}
                onPrevSong={() => dispatch(prevSong())}
              />

              <div className="basis-[90%] gap-8 flex items-center">
                <div className="basis-[80%] h-full flex gap-2 items-center">
                  <span className="text-xs tracking-tighter text-muted-foreground leading-non">
                    {secToMinSec(duration * progress)}
                  </span>
                  <ProgressRange
                    progress={progress}
                    setProgress={(val) => {
                      playerRef.current?.seekTo(val, "fraction");
                      setVolume(val);
                    }}
                  />
                  <span className="text-xs tracking-tighter text-muted-foreground leading-non">
                    {secToMinSec(duration)}
                  </span>
                </div>

                <div className="flex items-center justify-between grow">
                  <PlayerSongItem
                    image={curSong.artwork_url}
                    title={curSong.title}
                    username={curSong.username}
                  />

                  <PopoverPlaylist
                    curSong={curSong}
                    tracks={curPlaylist?.tracks || []}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
