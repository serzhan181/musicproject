import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { PlayButton } from "./ui/play-button";
import { PauseButton } from "./ui/pause-button";
import { ControllersProps } from "./player/controllers";

export interface SongCardProps
  extends Pick<ControllersProps, "isPlaying" | "onPause" | "onPlay"> {
  title: string;
  authorName: string;
  thumbnailUrl: string;
  id: number;
  curSongId: number;
  onPlaySong: (id: number) => void;
}

export const SongCard = ({
  authorName,
  thumbnailUrl,
  title,
  id,
  curSongId,
  isPlaying,
  onPause,
  onPlay,
  onPlaySong,
}: SongCardProps) => {
  return (
    <Card className="min-w-[312px]">
      <CardHeader>
        <CardTitle className="overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </CardTitle>
        <CardDescription className="overflow-hidden text-ellipsis whitespace-nowrap">
          {authorName}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative p-2 group">
        {curSongId === id && isPlaying ? (
          <PauseButton
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            onClick={onPause}
          />
        ) : (
          <PlayButton
            onClick={() => (curSongId !== id ? onPlaySong(id) : onPlay())}
            className="absolute z-30 transition-opacity -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 top-1/2 left-1/2"
          />
        )}
        <AspectRatio ratio={4 / 3}>
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover rounded-b-sm"
          />
        </AspectRatio>
      </CardContent>
    </Card>
  );
};
