import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SoundcloudPlaylistV2, SoundcloudTrackV2 } from "soundcloud.ts";

export interface ISong
  extends Pick<SoundcloudTrackV2, "title" | "artwork_url" | "id"> {
  username: string;
  songUrl: string;
}

export interface IPlaylist
  extends Pick<SoundcloudPlaylistV2, "title" | "artwork_url" | "id"> {
  username: string;
  songs: ISong[];
}

interface IPlayerSlice {
  curPlaylist?: IPlaylist;
  curSong?: ISong;
  curIdx?: number;
  isPlaying: boolean;
}

const initialState: IPlayerSlice = {
  isPlaying: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setSong: (state, action: PayloadAction<ISong | undefined>) => {
      state.curSong = action.payload;
      state.curIdx = action.payload?.id;
      state.isPlaying = !!action.payload;
    },

    setPlaylist: (state, action: PayloadAction<IPlaylist>) => {
      state.curPlaylist = action.payload;
      state.curSong = action.payload.songs[0];
      state.isPlaying = true;
    },

    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setSong, setIsPlaying, setPlaylist } = playerSlice.actions;
export default playerSlice.reducer;
