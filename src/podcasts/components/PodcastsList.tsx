import { useState, useEffect } from "react";
import { Row, Col, Card, Image, Form, InputGroup } from "react-bootstrap";
import { usePodcasts } from "../hooks/usePodcasts";
import { Feed } from "../../interface/podcast";
import { getPodcastByTitle } from "../helpers/getPodcastByTitle";
import { PodcastCard } from "./PodcastCard";

export const PodcastsList = () => {
  const { pods, isLoading, startLoadingPodcasts } = usePodcasts();
  const [query, setQuery] = useState(pods);

  useEffect(() => {
    startLoadingPodcasts();
  }, []);

  const podcastess = getPodcastByTitle(query);
  const onChangeEvent = (event: any) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <Row className="mt-3 mb-3">
        <Col></Col>
        <Col xs={4}>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Filter podcasts"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={query}
              onChange={onChangeEvent}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {!isLoading &&
          podcastess.map((pd: Feed, index: any) => (
            <PodcastCard
              key={index}
              pd={pd}
              id={pd.id}
              image={pd["im:image"][2]}
            />
          ))}
      </Row>
    </>
  );
};
