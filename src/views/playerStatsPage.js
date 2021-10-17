import React, { Component } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import {
  teamsLogos,
  blankLogo,
  playericon,
  Trophies,
  Football,
  bgplayer,
} from "staticdata/staticdata";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import "./playerstats.css";

class PlayerStatsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container fluid className="playerstats">
        <Row className="mb-2 pb-2">
          <Col>
            <h2 className="text-white text-center">
              <span> PLAYER STATISTICS</span>
            </h2>
            <h3 className="text-danger">
              {this.props.location.state.pfirstname +
                " " +
                this.props.location.state.plastName}
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
              <Card.Img
                variant="top"
                src={playericon}
                style={{ height: "50rem" }}
              />
              <Card.Body>
                <Card.Text>
                  Position : {this.props.location.state.pposition}
                </Card.Text>
                <Card.Text>
                  Nationality : {this.props.location.state.pnationality}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8} className="mt-3">
            <Card>
              <Card.Body>
                <Card.Header>CURRENT FORM</Card.Header>
                <Card.Text></Card.Text>
                <Card.Text>Agility: 70</Card.Text>
                <Card.Text>Dribble: 70</Card.Text>
                <Card.Text>Pass Accuracy: 70</Card.Text>
                <Card.Text>Strength: 70</Card.Text>
                <Card.Text>Speed: 70</Card.Text>
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Card.Header>GOALS</Card.Header>
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

export default PlayerStatsPage;
