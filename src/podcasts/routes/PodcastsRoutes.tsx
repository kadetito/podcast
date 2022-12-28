import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Podcasts, SearchPage, Podcast } from "../pages";

export const PodcastsRoutes = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Podcasts />}></Route>
        <Route path="search" element={<SearchPage />}></Route>
        <Route path="podcast" element={<Podcast />}></Route>
      </Routes>
    </Container>
  );
};
