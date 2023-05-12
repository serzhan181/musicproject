import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./features/player-slice";
import { soundcloudApi } from "./services/soundcloud-api";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    [soundcloudApi.reducerPath]: soundcloudApi.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(soundcloudApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
