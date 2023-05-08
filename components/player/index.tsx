"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import {
  ListVideo,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import Image from "next/image";
import { MouseEvent, useRef, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { useAppSelector } from "@/hooks/use-redux";
import { AnimatePresence, motion } from "framer-motion";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { setIsPlaying } from "@/store/features/player-slice";
import { secToMinSec } from "@/lib/utils";

export const Player = () => {
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const { isPlaying, curSong } = useAppSelector((state) => state.player);

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
            onDuration={(dur) => setDuration(dur)}
            progressInterval={100}
            loop
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
                  <div className="flex items-center w-full gap-2">
                    <div className="overflow-hidden border w-9 border-border">
                      <AspectRatio ratio={1}>
                        <Image
                          src={
                            curSong?.artwork_url || "/assets/agents/reyna.webp"
                          }
                          alt={curSong?.title || "U"}
                          fill
                        />
                      </AspectRatio>
                    </div>

                    <div>
                      <h6 className="w-[130px] overflow-hidden text-xs leading-none tracking-tight whitespace-nowrap text-ellipsis">
                        {curSong?.title}
                      </h6>
                      <span className="text-xs leading-none text-muted-foreground w-[130px] overflow-hidden whitespace-nowrap text-ellipsis">
                        {curSong?.username}
                      </span>
                    </div>
                  </div>

                  <button>
                    <ListVideo className="w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface ControllersProps {
  volume: number;
  setVolume: (v: number) => void;
  onPause: () => void;
  onPlay: () => void;
  isPlaying: boolean;
}

const Controllers = ({
  onPause,
  onPlay,
  isPlaying,
  volume,
  setVolume,
}: ControllersProps) => {
  const [prevVolume, setPrevVolume] = useState(0.3);
  return (
    <div className="flex items-center gap-2 grow">
      <button>
        <SkipBack className="w-5" />
      </button>
      <button onClick={isPlaying ? onPause : onPlay}>
        {isPlaying ? <Pause className="w-5" /> : <Play className="w-5" />}
      </button>
      <button>
        <SkipForward className="w-5" />
      </button>
      <HoverCard openDelay={0}>
        <HoverCardTrigger className="flex items-center ml-auto h-fit">
          <button
            onClick={() => {
              setPrevVolume(volume);
              if (volume > 0) setVolume(0);
              else setVolume(prevVolume);
            }}
          >
            {volume === 0 ? (
              <VolumeX className="w-6" />
            ) : volume <= 0.5 ? (
              <Volume1 className="w-6" />
            ) : (
              <Volume2 className="w-6" />
            )}
          </button>
        </HoverCardTrigger>

        <HoverCardContent className="p-2 bg-secondary">
          <span>
            <input
              type="range"
              min={0}
              max={1}
              value={volume}
              onChange={(e) => setVolume(+e.target.value)}
              step={0.01}
            />
          </span>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

interface ProgressRangeProps {
  progress: number;
  setProgress: (val: number) => void;
}

const ProgressRange = ({ progress, setProgress }: ProgressRangeProps) => {
  const [mouseDown, setMouseDown] = useState(false);

  const divRef = useRef<HTMLDivElement | null>(null);

  const handleSetProgress = (e: MouseEvent<HTMLDivElement>) => {
    const divWidth = divRef.current?.offsetWidth || 0;
    const position = e.clientX - (divRef.current?.offsetLeft || 0);
    const percentage = position / divWidth;
    setProgress(percentage);
  };

  return (
    <div
      className="flex items-center w-full h-full cursor-pointer group"
      onMouseDown={(e) => {
        handleSetProgress(e);
        setMouseDown(true);
      }}
      onMouseUp={() => setMouseDown(false)}
      onMouseLeave={() => setMouseDown(false)}
      onMouseMove={(e) => {
        if (mouseDown) {
          handleSetProgress(e);
        }
      }}
      ref={divRef}
    >
      {/* // All progress bar */}
      <div className="w-full h-0.5 bg-background relative">
        {/* Played progress */}
        <div
          style={{ width: `${progress * 100}%` }}
          className="bg-primary h-0.5"
        ></div>
        <div
          style={{ left: `${progress * 100}%` }}
          className="absolute w-2 h-2 transition-opacity rounded-full opacity-0 cursor-pointer -top-[3px] bg-primary group-hover:opacity-100"
        ></div>
      </div>
    </div>
  );
};
