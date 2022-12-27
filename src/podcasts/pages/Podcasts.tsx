import { Container, Col, Row } from "react-bootstrap";

export const Podcasts = () => {
  return (
    <Container>
      <Row>
        <Col className="border-bottom pb-3 pt-3">
          <h4>Podcaster</h4>
        </Col>
      </Row>
      <Row>
        <Col>Search</Col>
      </Row>

      <Row>
        <Col>Grid</Col>
      </Row>
    </Container>
  );
};
