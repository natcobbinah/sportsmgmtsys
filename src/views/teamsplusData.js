import React, { Component } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { teamsLogos, blankLogo } from "staticdata/staticdata";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import { getAllTeams } from "../httpEndpoints/sportsapiTeamsEndpoint";

class TeamsPlusData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      info: "",
      logo: null,
      allTeamsFetch: [],
    };

    this.teamInfoAndStatsBtn = this.teamInfoAndStatsBtn.bind(this);
  }

  teamInfoAndStatsBtn(name, info, logo, players, coaches) {
    this.setState({ name, info, logo, players, coaches });
    let teamData = {
      name,
      info,
      logo,
      players,
      coaches,
    };
    this.props.history.push({
      pathname: "/teamplusDataFullIntro",
      state: teamData,
    });
  }

  componentDidMount() {
    getAllTeams()
      .then((result) => this.setState({ allTeamsFetch: result.data }))
      .catch((err) => this.setState({ err }));
  }

  render() {
    const { allTeamsFetch } = this.state;
    return (
      <Container fluid>
        <Row className="my-3 py-3">
          <Col>
            <h2 className="text-center">
              <span>Local League Teams</span>
            </h2>
          </Col>
        </Row>

        <Row className="my-3 py-3 mt-3">
          {teamsLogos
            ? teamsLogos.map((team) => (
                <Col md={4} className="mt-3">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={team.logo}
                      style={{ height: "25rem" }}
                    />
                    <Card.Body>
                      <Card.Title>{team.name}</Card.Title>
                      <Card.Text>{team.info}</Card.Text>
                    </Card.Body>
                    <Card.Body>
                      <Button
                        variant="danger"
                        size="lg"
                        className="mb-3"
                        onClick={() =>
                          this.teamInfoAndStatsBtn(
                            team.name,
                            team.info,
                            team.logo
                          )
                        }
                      >
                        View More Info
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            : null}
        </Row>

        <Row className="my-3 py-3 mt-3">
          {allTeamsFetch
            ? allTeamsFetch.map((team) => (
                <Col md={4} className="mt-3">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={blankLogo}
                      style={{ height: "25rem" }}
                    />
                    <Card.Body>
                      <Card.Title>{team.teamName}</Card.Title>
                      <Card.Text>Owner - {team.teamOwner}</Card.Text>
                    </Card.Body>
                    <Card.Body>
                      <Button
                        variant="danger"
                        size="lg"
                        className="mb-3"
                        onClick={() =>
                          this.teamInfoAndStatsBtn(
                            team.teamName,
                            team.teamOwner,
                            blankLogo,
                            team.players,
                            team.coaches
                          )
                        }
                      >
                        View More Info
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            : null}
        </Row>
      </Container>
    );
  }
}

export default TeamsPlusData;
