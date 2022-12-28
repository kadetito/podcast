import { configureStore } from "@reduxjs/toolkit";
import { podCatSlice } from "./podcastSlice";
import { episodesSlice } from "./episodesSlice";

export const store = configureStore({
  reducer: {
    podcasts: podCatSlice.reducer,
    episodes: episodesSlice.reducer,
  },
});
