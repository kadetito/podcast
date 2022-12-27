import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";
import PodcastApp from "./PodcastApp";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PodcastApp />
  </React.StrictMode>
);
