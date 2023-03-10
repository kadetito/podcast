import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Podcasts, SearchPage, Podcast, Episode } from "../pages";

export const PodcastsRoutes = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Podcasts />}></Route>
        <Route path="search" element={<SearchPage />}></Route>
        <Route path="podcast/:podcastId" element={<Podcast />}></Route>
        <Route
          path="podcast/:podcastId/:episodeId"
          element={<Episode />}
        ></Route>
      </Routes>
    </Container>
  );
};
