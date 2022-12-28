import { Result } from "../../interface/episodes";

export const fromEpisodeToData = (episodes: Result[]) => {
  return episodes.map((episode: Result) => {
    return episode;
  });
};
