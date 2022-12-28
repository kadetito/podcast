import React, { useState } from "react";
import { getPodcastByTitle } from "../helpers/getPodcastByTitle";

export const SearchInput = ({ pods }: any) => {
  const [query, setQuery] = useState(pods);
  const podcastess = getPodcastByTitle(query);
  const onChangeEvent = (event: any) => {
    setQuery(event.target.value);
    console.log(query);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search podcasts"
        className="form-control"
        name="searchText"
        autoComplete="off"
        value={query}
        onChange={onChangeEvent}
      />
    </div>
  );
};
