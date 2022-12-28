import { createSlice } from "@reduxjs/toolkit";
import { Feed } from "../src/interface/podcast";
import { FC } from "react";
import { Result } from "../src/interface/episodes";

export const episodesSlice = createSlice({
  name: "episodes",

  initialState: {
    isLoading: true,
    episodes: [],
  },

  reducers: {
    episodeslist: (state, { payload }) => {
      state.isLoading = false;
      state.episodes = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { episodeslist } = episodesSlice.actions;
