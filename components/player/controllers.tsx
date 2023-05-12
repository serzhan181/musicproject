import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Slider } from "../ui/slider";

export interface ControllersProps {
  volume: number;
  setVolume: (v: number) => void;
  onPause: () => void;
  onPlay: () => void;
  onPrevSong: () => void;
  onNextSong: () => void;
  isPlaying: boolean;
}

export const Controllers = ({
  onPause,
  onPlay,
  isPlaying,
  volume,
  setVolume,
  onNextSong,
  onPrevSong,
}: ControllersProps) => {
  const [prevVolume, setPrevVolume] = useState(0.3);
  return (
    <div className="flex items-center gap-2 grow">
      <button onClick={onPrevSong}>
        <SkipBack className="w-5" />
      </button>
      <button onClick={isPlaying ? onPause : onPlay}>
        {isPlaying ? <Pause className="w-5" /> : <Play className="w-5" />}
      </button>
      <button onClick={onNextSong}>
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
          <Slider
            min={0}
            max={1}
            value={[volume]}
            step={0.01}
            onValueChange={(e) => setVolume(e[0])}
          />
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
