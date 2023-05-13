"use client";

import { Input } from "@/components/form/input";
import { SongCard } from "@/components/song-card";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/use-redux";
import {
  seekToSong,
  setIsPlaying,
  setPlaylist,
} from "@/store/features/player-slice";
import { useSearchTracksQuery } from "@/store/services/soundcloud-api";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { LoadingSkeleton } from "./_components/skeleton";

export default function SearchPage() {
  const searchParams = useSearchParams();

  const query = searchParams?.get("q");

  const { data, isLoading } = useSearchTracksQuery(query || "", {
    skip: !query,
  });

  const dispatch = useDispatch();
  const { curSong, curPlaylist } = useAppSelector((state) => state.player);

  return (
    <div className="w-full h-full">
      <SearchInput />
      <div className="grid gap-5 mt-3 sm:grid-cols-2 xs:grid-cols-1 md:grid-cols-4">
        {isLoading && <LoadingSkeleton />}
        {data && !isLoading && (
          <>
            {data.res.collection.map((t, idx) => (
              <SongCard
                key={t.id}
                title={t.title}
                authorName={t.user.username}
                thumbnailUrl={
                  t?.artwork_url?.replace("large", "t500x500") ||
                  "/assets/images/agents/reyna.webp"
                }
                id={t.id}
                curSongId={curSong?.id || -1}
                onPlaySong={(songId) => {
                  if (curPlaylist?.id !== data.res.collection[0].id) {
                    dispatch(
                      setPlaylist({
                        id: data.res.collection[0].id,
                        tracks: data.res.collection,
                        artwork_url: data.res.collection[0].artwork_url,
                        username: data.res.collection[0].user.username,
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
                isPlaying={false}
                onPause={() => dispatch(setIsPlaying(false))}
                onPlay={() => dispatch(setIsPlaying(true))}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

interface SearchInputProps {}

const SearchInput = (props: SearchInputProps) => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };
  return (
    <form className="flex gap-2" onSubmit={(e) => onSubmit(e)}>
      <Input
        placeholder="Search"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <Button type="submit">
        <Search />
      </Button>
    </form>
  );
};
