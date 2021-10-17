import React, { Component } from "react";
import { Card, Container, Row, Col, Button, Table } from "react-bootstrap";
import { teamsHistory } from "staticdata/staticdata";
import "bootstrap/dist/css/bootstrap.min.css";

class TeamPlusDataFullInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //playerstatsInfo
      pfirstname: "",
      plastName: "",
      pnationality: "",
      pposition: "",

      //coach info
      cfirstName: "",
      clastName: "",
      cnationality: "",
    };

    this.viewPlayerStats = this.viewPlayerStats.bind(this);
    this.viewCoachStats = this.viewCoachStats.bind(this);
  }

  viewPlayerStats(pfirstname, plastName, pnationality, pposition) {
    this.setState({ pfirstname, plastName, pnationality, pposition });
    let playerStatsData = {
      pfirstname,
      plastName,
      pposition,
      pnationality,
    };
    console.log(playerStatsData);
    this.props.history.push({
      pathname: "/playerStats",
      state: playerStatsData,
    });
  }

  viewCoachStats(cfirstName, clastName, cnationality) {
    this.setState({ cfirstName, clastName, cnationality });
    let coachStatsData = {
      cfirstName,
      clastName,
      cnationality,
    };
    console.log(coachStatsData);
    this.props.history.push({
      pathname: "/coachStats",
      state: coachStatsData,
    });
  }

  render() {
    return (
      <Container fluid>
        <Row className="my-3 py-3">
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
                src={this.props.location.state.logo}
                style={{ height: "25rem" }}
              />
              <Card.Body>
                <Card.Text>{this.props.location.state.name}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8} className="mt-3">
            <Card className="text-center">
              <Card.Header>HISTORY DELIGHT</Card.Header>
              <Card.Body>
                <Card.Title>BRIEF...</Card.Title>
                {this.props.location.state.name == "Accra Lions" ? (
                  <Card.Text> {teamsHistory[0].accralions}</Card.Text>
                ) : this.props.location.state.name == "Aduana Stars" ? (
                  <Card.Text> {teamsHistory[1].aduanaStars}</Card.Text>
                ) : this.props.location.state.name == "Asante  Kotoko" ? (
                  <Card.Text> {teamsHistory[2].asanteKotoko}</Card.Text>
                ) : this.props.location.state.name == "Ashanti Gold" ? (
                  <Card.Text> {teamsHistory[3].ashantigold}</Card.Text>
                ) : this.props.location.state.name == "Bechem United" ? (
                  <Card.Text> {teamsHistory[4].bechemunited}</Card.Text>
                ) : this.props.location.state.name == "Berekum Chelsea" ? (
                  <Card.Text> {teamsHistory[5].berekumChelsea}</Card.Text>
                ) : this.props.location.state.name == "Bibiani United" ? (
                  <Card.Text> {teamsHistory[6].bibiani}</Card.Text>
                ) : null}
              </Card.Body>
              {this.props.location.state.players ? (
                <Card.Body>
                  <Card.Title>Team Players</Card.Title>{" "}
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Nationality</th>
                        <th>Position</th>
                        <th>Statistics</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.location.state.players.map((player) => (
                        <tr key={player._id}>
                          <td>{player.firstName}</td>
                          <td>{player.lastName}</td>
                          <td>{player.nationality}</td>
                          <td>{player.position}</td>
                          <td>
                            <Button
                              variant="danger"
                              size="lg"
                              className="mb-3"
                              onClick={() =>
                                this.viewPlayerStats(
                                  player.firstName,
                                  player.lastName,
                                  player.nationality,
                                  player.position
                                )
                              }
                            >
                              Stats
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              ) : null}
              <br />
              {this.props.location.state.coaches ? (
                <Card.Body>
                  <Card.Title>Team Coaches</Card.Title>{" "}
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Nationality</th>
                        <th>Statistics</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.location.state.coaches.map((coach) => (
                        <tr key={coach._id}>
                          <td>{coach.firstName}</td>
                          <td>{coach.lastName}</td>
                          <td>{coach.nationality}</td>
                          <td>
                            <Button
                              variant="danger"
                              size="lg"
                              className="mb-3"
                              onClick={() =>
                                this.viewCoachStats(
                                  coach.firstName,
                                  coach.lastName,
                                  coach.nationality
                                )
                              }
                            >
                              Stats
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              ) : null}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TeamPlusDataFullInfo;
