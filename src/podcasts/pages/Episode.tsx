import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPodcastById } from "../helpers/getPodcastById";
import { usePodcasts } from "../hooks/usePodcasts";
import { GeneralLayout } from "../../../layouts/GeneralLayout";
import { Breadcrumb, Card, Col, Row, Image } from "react-bootstrap";
import { FC } from "react";
import { Feed, ID, IMImage } from "../../interface/podcast";
import { EpisodesList } from "../components/EpisodesList";
import { useEpisodes } from "../hooks/useEpisdes";

export const Episode = () => {
  const { podcastId, episodeId } = useParams();
  // const pod = getPodcastById(podcastId);
  // const { episodes, isLoading } = useEpisodes();
  // if (!pod) {
  //   return <>Not found</>;
  // }
  console.log(podcastId, episodeId);
  return (
    <GeneralLayout>
      <>
        <Breadcrumb className="mt-2 mb-5">
          <Breadcrumb.Item href="/">Podcast List</Breadcrumb.Item>
          <Breadcrumb.Item href={`/podcast/${podcastId}`}>
            {podcastId}
          </Breadcrumb.Item>
        </Breadcrumb>
        {podcastId}
        {episodeId}
      </>
      {/* <Row>
        <Col md={3}>
          <Card className="pod__detail">
            <Card.Body>
              <div className="border-bottom">
                <Image
                  className="pod__imagepodcastbig mb-4"
                  src={pod["im:image"][2].label}
                  fluid
                />
              </div>
              <div className="border-bottom mt-2">
                <h4>{pod.title.label}</h4>
                <h5>
                  <em>by {pod["im:artist"].label}</em>
                </h5>
              </div>
              <div className="border-bottom mt-2">
                <h5>
                  <strong>Description</strong>
                </h5>
                <h5>
                  <em>{pod.summary.label}</em>
                </h5>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="pod__detail mb-3">
            <Card.Body>
              {!isLoading && <h3>Episodes: {episodes.resultCount}</h3>}
            </Card.Body>
          </Card>
          <Card className="pod__detail">
            <Card.Body>
              <EpisodesList />
            </Card.Body>
          </Card>
        </Col>
      </Row> */}
    </GeneralLayout>
  );
};
