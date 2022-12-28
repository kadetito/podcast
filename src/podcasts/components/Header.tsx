import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SmallLoader } from "./";
import { usePodcasts } from "../hooks/usePodcasts";

export const Header = () => {
  const { isLoading } = usePodcasts();
  return (
    <Row>
      <Col className="border-bottom pb-3 pt-3">
        <div className="d-flex justify-content-between">
          <Link to="/" className="brand_link">
            <h5>Podcaster</h5>
          </Link>
          {isLoading ? <SmallLoader /> : <></>}
        </div>
      </Col>
    </Row>
  );
};
