import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./features/player-slice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
  },

  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat(soundcloudApi.middleware);
  // },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
