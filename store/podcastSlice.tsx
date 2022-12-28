import { createSlice } from "@reduxjs/toolkit";
import { Feed } from "../src/interface/podcast";
import { FC } from "react";

export const podCatSlice = createSlice({
  name: "podcasts",

  initialState: {
    isLoading: true,
    pods: [],
  },

  reducers: {
    podcastslist: (state, { payload = [] }) => {
      state.isLoading = false;
      payload.forEach((pod: Feed) => {
        const exists = state.pods.some(
          (dbEvent: Feed) => dbEvent.id === pod.id
        );
        if (!exists) {
          state.pods.push(pod);
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { podcastslist } = podCatSlice.actions;
