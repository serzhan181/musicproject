import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { PlayButton } from "./ui/play-button";
import { cn } from "@/lib/utils";
import { badgeVariants } from "./ui/badge";
import { Copy, ScreenShare } from "lucide-react";
import { SongCardProps } from "./song-card";
import { SoundcloudTrackV2 } from "soundcloud.ts";
import { PauseButton } from "./ui/pause-button";

interface PlaylistCardProps
  extends Pick<
    SongCardProps,
    | "authorName"
    | "thumbnailUrl"
    | "title"
    | "isPlaying"
    | "onPause"
    | "onPlay"
    | "onPlaySong"
    | "id"
  > {
  firstTrack: SoundcloudTrackV2;
  tracksCount: number;
  curPlaylistId?: number;
}

export const PlaylistCard = ({
  authorName,
  thumbnailUrl,
  title,
  firstTrack,
  tracksCount,
  isPlaying,
  onPause,
  onPlay,
  onPlaySong,
  curPlaylistId,
  id,
}: PlaylistCardProps) => {
  return (
    <Card className="flex overflow-hidden">
      <div className="w-60 bg-background/50">
        <AspectRatio ratio={1}>
          <Image
            src={thumbnailUrl || "/assets/agents/reyna.webp"}
            alt={title || "Unknown playlist"}
            fill
            className="object-contain"
          />
        </AspectRatio>
      </div>
      <div className="flex flex-col w-full gap-3 p-3">
        <PlaylistHeader
          authorName={authorName}
          title={title}
          onStartPlaylist={() => onPlaySong(firstTrack.id)}
          isPlaying={isPlaying}
          onPause={onPause}
          onPlay={onPlay}
          curPlaylistId={curPlaylistId}
          id={id}
        />

        {firstTrack && (
          <div className="mt-auto space-y-1">
            <CardDescription className="pl-3">
              {tracksCount} tracks
            </CardDescription>
            <div className="rounded-sm bg-muted text-muted-foreground">
              <SongItem songName={firstTrack.title} />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

interface PlaylistHeaderProps
  extends Pick<PlaylistCardProps, "title" | "authorName"> {
  onStartPlaylist: () => void;
  isPlaying: boolean;
  onPause: () => void;
  onPlay: () => void;
  curPlaylistId?: number;
  id: number;
}

const PlaylistHeader = ({
  authorName,
  title,
  onStartPlaylist,
  isPlaying,
  onPlay,
  onPause,
  curPlaylistId,
  id,
}: PlaylistHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {curPlaylistId === id && isPlaying ? (
          <PauseButton onClick={onPause} />
        ) : (
          <PlayButton
            onClick={() =>
              curPlaylistId !== id ? onStartPlaylist() : onPlay()
            }
          />
        )}
        <div>
          <CardTitle className="text-2xl max-w-[450px] overflow-hidden whitespace-nowrap text-ellipsis">
            {title}
          </CardTitle>
          <CardDescription>{authorName}</CardDescription>
        </div>
      </div>

      <div className="space-x-2">
        <button
          className={cn(badgeVariants({ variant: "outline" }), "space-x-1")}
        >
          <ScreenShare className="w-3" />
          <span>share</span>
        </button>
        <button
          className={cn(badgeVariants({ variant: "outline" }), "space-x-1")}
        >
          <Copy className="w-3" />
          <span>copy link</span>
        </button>
      </div>
    </div>
  );
};

const SongItem = ({
  songName,
  active,
}: {
  active?: boolean;
  songName: string;
}) => {
  return (
    <button
      className={cn(
        "inline-flex w-full hover:bg-background/50 items-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-background text-foreground shadow-sm": !!active,
        }
      )}
    >
      {songName}
    </button>
  );
};
