import { sc } from "@/config/soundcloud";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  SoundcloudPlaylistSearchV2,
  SoundcloudTrackSearchV2,
} from "soundcloud.ts";

export const soundcloudApi = createApi({
  reducerPath: "soundcloudApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    searchTracks: builder.query<{ res: SoundcloudTrackSearchV2 }, string>({
      query: (q) => `/search/api?q=${encodeURIComponent(q)}&type=tracks`,
    }),
    searchPlaylists: builder.query<{ res: SoundcloudPlaylistSearchV2 }, string>(
      {
        query: (q) => `/search/api?q=${encodeURIComponent(q)}&type=playlists`,
      }
    ),
  }),
});

export const { useSearchPlaylistsQuery, useSearchTracksQuery } = soundcloudApi;
