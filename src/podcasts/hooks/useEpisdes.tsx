import { useSelector, useDispatch } from "react-redux";
import { episodeslist } from "../../../store";
import podcastApi from "../../api/podcastApi";

import { Feed } from "../../interface/podcast";
import { fromEpisodeToData } from "../helpers/fromEpisodeToData";
import { Result, Welcome } from "../../interface/episodes";
import { useParams } from "react-router-dom";

export const useEpisodes = () => {
  const dispatch = useDispatch();
  const { podcastId } = useParams();
  const { episodes, isLoading } = useSelector((state: any) => state.episodes);

  const startLoadingEpisodes = async () => {
    try {
      const { data } = await podcastApi.get(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://itunes.apple.com/lookup?id=${podcastId}`
        )}`
      );

      const dataFeed: Result[] = JSON.parse(data.contents);
      console.log("episodios", dataFeed);
      dispatch(episodeslist(dataFeed));
    } catch (error) {
      console.log("error loading data");
      console.log(error);
    }
  };

  return {
    episodes,
    isLoading,
    startLoadingEpisodes,
  };
};
