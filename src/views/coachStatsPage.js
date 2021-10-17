import React, { Component } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import {
  teamsLogos,
  blankLogo,
  playericon,
  Trophies,
  Football,
  coach,
  bgcoach,
} from "staticdata/staticdata";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import "./coachStats.css";

class CoachStatsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container fluid className="coachstats">
        <Row className="mb-2 pb-2">
          <Col>
            <h2 className="text-white text-center">
              <span> COACH STATISTICS</span>
            </h2>
            <h3 className="text-white">
              {this.props.location.state.cfirstName +
                " " +
                this.props.location.state.clastName}
            </h3>
          </Col>
        </Row>

        <Row className="my-2 py-2">
          <Col>
            <h2 className="text-center">
              <span> {this.props.location.state.name} </span>
            </h2>
          </Col>
        </Row>
        <Row className="my-3 py-3 mt-3">
          <Col md={4} className="mt-3">
            <Card>
              <Card.Img variant="top" src={coach} style={{ height: "30rem" }} />
              <Card.Body>
                <Card.Text>
                  Nationality : {this.props.location.state.cnationality}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8} className="mt-3">
            <Card>
              <Card.Body>
                <Card.Header>GAMES WON</Card.Header>
                <Card.Text>10</Card.Text>
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Card.Header>GAMES LOST</Card.Header>
                <Card.Text>1</Card.Text>
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Card.Header>OVERALL STATISTICS</Card.Header>
                <Card.Text>1</Card.Text>
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Card.Header>TROPHIES</Card.Header>
                <Card.Text>1</Card.Text>
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CoachStatsPage;
