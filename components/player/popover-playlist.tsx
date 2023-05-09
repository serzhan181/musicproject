import { ListVideo } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PlayerSongItem } from "./player-song-item";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import type { ISong } from "../../store/features/player-slice";
import { SoundcloudTrackV2 } from "soundcloud.ts";

interface PopoverPlaylistProps {
  curSong: ISong;
  tracks: SoundcloudTrackV2[];
}

export const PopoverPlaylist = ({ tracks, curSong }: PopoverPlaylistProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <ListVideo />
      </PopoverTrigger>
      <PopoverContent
        className="p-0 rounded-sm w-96 min-h-[256px]  overflow-y-auto max-h-[520px]"
        sideOffset={16}
        align="end"
      >
        <div className="flex items-center w-full gap-2 p-2 border-b border-border">
          <div className="relative w-12 overflow-hidden border border-border">
            <Image
              src="/assets/svgs/equalizer.svg"
              alt="equalizer"
              width={20}
              height={20}
              className="absolute z-30 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary top-1/2 left-1/2"
            />
            <AspectRatio ratio={1}>
              <Image
                src={curSong.artwork_url || "/assets/agents/reyna.webp"}
                alt={"U"}
                fill
              />
            </AspectRatio>
          </div>

          <div>
            <h6 className="w-[270px] overflow-hidden text-primary-foreground text-base leading-none tracking-tight whitespace-nowrap text-ellipsis">
              {curSong.title}
            </h6>
            <span className="text-sm leading-none inline-block text-primary-foreground w-[270px] overflow-hidden whitespace-nowrap text-ellipsis">
              {curSong.username}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-2">
          {tracks.map((t) => (
            <PlayerSongItem
              key={t.id}
              image={t.artwork_url}
              title={t.title}
              username={t.user.username}
              maxW={270}
              active={curSong.id === t.id}
              className="p-2"
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};