import { Card, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Feed,
  ID,
  IMImage,
  IMImageAttributes,
  Entry,
} from "../../interface/podcast";
import { FC } from "react";

interface Props {
  pd: Feed;
  id: ID;
  image: IMImage[];
}

export const PodcastCard: FC<Props> = ({ pd, id, image, podcastId }) => {
  return (
    <Col
      md={3}
      sm={6}
      key={id.attributes["im:id"]}
      className="mb-5 mt-3 pod__list"
    >
      <Link to={`/podcast/${id.attributes["im:id"]}`}>
        <Card className="shadow border-0">
          <Card.Body>
            <div className="text-center">
              <Image
                className="pod__imagepodcast mb-4"
                roundedCircle
                src={image.label}
                fluid
              />
              <h5>{pd.title.label}</h5>
              <h6>Author: Nombre y apellidos</h6>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};
