import { configureStore } from "@reduxjs/toolkit";
import { podCatSlice } from "./podcastSlice";

export const store = configureStore({
  reducer: {
    podcasts: podCatSlice.reducer,
  },
});
