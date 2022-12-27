import { Routes, Route } from "react-router-dom";
import { Podcasts } from "../podcasts/pages/Podcasts";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Podcasts />}></Route>
      </Routes>
    </>
  );
};
