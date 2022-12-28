import { usePodcasts } from "../hooks/usePodcasts";
import { Feed } from "../../interface/podcast";
import { useEffect } from "react";

export const getPodcastById = (podcastId: any) => {
  const { pods, startLoadingPodcasts } = usePodcasts();

  useEffect(() => {
    startLoadingPodcasts();
  }, []);

  return pods.find((pod: any) => pod.id.attributes["im:id"] === podcastId);
};
