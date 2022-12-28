import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import PodcastApp from "./PodcastApp";
import { store } from "../store";

import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PodcastApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
