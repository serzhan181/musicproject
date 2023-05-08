"use client";

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
import { useDispatch } from "react-redux";
import { setIsPlaying, setSong } from "@/store/features/player-slice";
import { useAppSelector } from "@/hooks/use-redux";
import { PauseButton } from "./ui/pause-button";

export interface SongCardProps {
  title: string;
  authorName: string;
  thumbnailUrl: string;
  songUrl: string;
  id: number;
}

export const SongCard = ({
  authorName,
  thumbnailUrl,
  title,
  id,
  songUrl,
}: SongCardProps) => {
  const dispatch = useDispatch();
  const curSong = useAppSelector((state) => state.player.curSong);
  const isPlaying = useAppSelector((state) => state.player.isPlaying);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </CardTitle>
        <CardDescription>{authorName}</CardDescription>
      </CardHeader>
      <CardContent className="relative p-2 group">
        {curSong?.id === id && isPlaying ? (
          <PauseButton
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            onClick={() => dispatch(setIsPlaying(false))}
          />
        ) : (
          <PlayButton
            onClick={() =>
              curSong?.id !== id
                ? dispatch(
                    setSong({
                      artwork_url: thumbnailUrl,
                      id,
                      title,
                      username: authorName,
                      songUrl,
                    })
                  )
                : dispatch(setIsPlaying(true))
            }
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
