import React, { Component } from "react";
import { Card, Container, Row, Col, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class NewsFull extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container fluid>
        <Row className="my-3 py-3">
          <Col>
            <h2 className="text-center">
              <span> {this.props.location.state.description} </span>
            </h2>
          </Col>
        </Row>

        <Row className="my-3 py-3 mt-3">
          <Col md={4} className="mt-3">
            <Card>
              <Card.Img
                variant="top"
                src={this.props.location.state.image}
                style={{ height: "25rem" }}
              />
            </Card>
          </Col>
          <Col md={8} className="mt-3">
            <Card.Body>
              <Card.Text>{this.props.location.state.fulldescription}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NewsFull;
