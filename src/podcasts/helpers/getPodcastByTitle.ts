import React from "react";
import { usePodcasts } from "../hooks/usePodcasts";
import { Feed } from "../../interface/podcast";

export const getPodcastByTitle = (title: any = "") => {
  const { pods, isLoading, startLoadingPodcasts } = usePodcasts();

  if (title === undefined) {
    return pods;
  }
  title = title.toString().toLocaleLowerCase().trim();

  console.log("title", title);
  return pods.filter((pod: any) =>
    pod.title.label.toLocaleLowerCase().includes(title)
  );
};
