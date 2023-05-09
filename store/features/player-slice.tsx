import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SoundcloudPlaylistV2, SoundcloudTrackV2 } from "soundcloud.ts";

export interface ISong
  extends Pick<SoundcloudTrackV2, "title" | "artwork_url" | "id"> {
  username: string;
  songUrl: string;
}

export interface IPlaylist {
  id: number;
  username?: string;
  artwork_url?: string;
  tracks: SoundcloudTrackV2[];
  idxInPlaylist?: number;
}

interface IPlayerSlice {
  curPlaylist?: IPlaylist;
  curSong?: ISong;
  curIdx: number;
  isPlaying: boolean;
}

const initialState: IPlayerSlice = {
  isPlaying: false,
  curIdx: 0,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setSong: (state, action: PayloadAction<ISong | undefined>) => {
      state.curSong = action.payload;
      state.isPlaying = !!action.payload;
    },

    setPlaylist: (state, action: PayloadAction<IPlaylist>) => {
      state.curPlaylist = action.payload;
      const idxInPlaylist = action.payload?.idxInPlaylist || 0;
      state.curSong = {
        artwork_url: action.payload.tracks[idxInPlaylist].artwork_url,
        id: action.payload.tracks[idxInPlaylist].id,
        songUrl: action.payload.tracks[idxInPlaylist].permalink_url,
        title: action.payload.tracks[idxInPlaylist].title,
        username: action.payload.tracks[idxInPlaylist].user.username,
      };
      state.curIdx = 0;
      state.isPlaying = true;
    },

    nextSong: (state) => {
      state.isPlaying = false;
      if (state.curIdx === (state?.curPlaylist?.tracks?.length || 0) - 1) {
        state.curIdx = 0;
      } else state.curIdx++;
      const desired = state.curPlaylist?.tracks[state.curIdx];
      state.curSong = desired
        ? {
            artwork_url: desired?.artwork_url,
            id: desired?.id,
            songUrl: desired?.permalink_url,
            title: desired?.title,
            username: desired.user.username,
          }
        : undefined;
      state.isPlaying = true;
    },

    prevSong: (state) => {
      state.isPlaying = false;
      if (state.curIdx === 0) {
        state.curIdx = (state.curPlaylist?.tracks.length || 1) - 1;
      } else state.curIdx--;
      const desired = state.curPlaylist?.tracks[state.curIdx];
      state.curSong = desired
        ? {
            artwork_url: desired?.artwork_url,
            id: desired?.id,
            songUrl: desired?.permalink_url,
            title: desired?.title,
            username: desired.user.username,
          }
        : undefined;
      state.isPlaying = true;
    },

    seekToSong: (state, action: PayloadAction<number>) => {
      const isOutOfBound =
        action.payload < 0 ||
        action.payload > (state.curPlaylist?.tracks.length || 1) - 1;
      if (isOutOfBound) return;

      state.curIdx = action.payload;
      if (state.curPlaylist) {
        const desiredSong = state.curPlaylist.tracks[action.payload];
        state.curSong = {
          artwork_url: desiredSong.artwork_url,
          id: desiredSong.id,
          songUrl: desiredSong.permalink_url,
          title: desiredSong.title,
          username: desiredSong.user.username,
        };
      }
    },

    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
  },
});

export const {
  setSong,
  setIsPlaying,
  setPlaylist,
  nextSong,
  prevSong,
  seekToSong,
} = playerSlice.actions;
export default playerSlice.reducer;
