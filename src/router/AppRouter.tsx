import { Routes, Route } from "react-router-dom";

import { PodcastsRoutes } from "../podcasts/routes/PodcastsRoutes";

//this router is created for the login auth possibility
export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<PodcastsRoutes />}></Route>
      </Routes>
    </>
  );
};
