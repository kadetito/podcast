import { useState, useEffect } from "react";
import { Row, Col, Card, Image, Form, InputGroup } from "react-bootstrap";
import moment from "moment";
import { Feed } from "../../interface/podcast";
import { getPodcastByTitle } from "../helpers/getPodcastByTitle";
import { PodcastCard } from "./PodcastCard";
import { useEpisodes } from "../hooks/useEpisdes";
import { Result } from "../../interface/episodes";
import { Link, useParams } from "react-router-dom";

export const EpisodesList = () => {
  const { episodes, isLoading, startLoadingEpisodes } = useEpisodes();
  const { podcastId } = useParams();
  useEffect(() => {
    startLoadingEpisodes();
  }, []);

  return (
    <>
      <Row className="mt-3 mb-3">
        {!isLoading &&
          episodes.results.map((pd: Result, index: any) => (
            <div key={index}>
              <Row>
                <Col>
                  <Link to={`/podcast/${podcastId}/${pd.trackId}`}>
                    {pd.trackName}
                  </Link>
                </Col>
                <Col>{moment(pd.releaseDate).format("DD/MM/YYYY")}</Col>
                {/* <Col>{pd.trackTimeMillis}</Col> */}
              </Row>
            </div>
          ))}
      </Row>
    </>
  );
};
