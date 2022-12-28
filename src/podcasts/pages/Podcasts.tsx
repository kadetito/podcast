import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Header } from "../components";
import { PodcastsList } from "../components/PodcastsList";
import { SearchInput } from "../components/SearchInput";
import { GeneralLayout } from "../../../layouts/GeneralLayout";

export const Podcasts = () => {
  return (
    <GeneralLayout>
      <PodcastsList />
    </GeneralLayout>
  );
};
