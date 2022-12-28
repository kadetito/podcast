import React from "react";
import { usePodcasts } from "../hooks/usePodcasts";
import { Feed } from "../../interface/podcast";

export const getPodcastByTitle = (title: string = "") => {
  const { pods, isLoading, startLoadingPodcasts } = usePodcasts();

  title = title.toString().toLocaleLowerCase().trim();
  console.log("tit", title);
  if (title.length === 0) {
    return pods;
  }

  return pods.filter((pod: any) =>
    pod.title.label.toLocaleLowerCase().includes(title)
  );
};
