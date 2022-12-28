import { useSelector, useDispatch } from "react-redux";
import { podcastslist } from "../../../store";
import podcastApi from "../../api/podcastApi";
import { fromPodcastToData } from "../helpers/fromPodcastToData";
import { Feed } from "../../interface/podcast";

export const usePodcasts = () => {
  const dispatch = useDispatch();
  const { pods, isLoading } = useSelector((state: any) => state.podcasts);

  const startLoadingPodcasts = async () => {
    try {
      const { data } = await podcastApi.get(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      );
      const dataFeed: Feed = fromPodcastToData(data.feed.entry);
      dispatch(podcastslist(dataFeed));
    } catch (error) {
      console.log("error loading data");
      console.log(error);
    }
  };

  return {
    pods,
    isLoading,
    startLoadingPodcasts,
  };
};
