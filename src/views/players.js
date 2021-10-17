import React, { Component } from "react";

import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  Alert,
} from "react-bootstrap";

import {
  getAllPlayers,
  addNewPlayer,
  updatePlayer,
  deletePlayer,
} from "../httpEndpoints/sportsapiPlayersEndpoints";

import { getAllTeams } from "../httpEndpoints/sportsapiTeamsEndpoint";

class Players extends Component {
  constructor(props) {
    super(props);

    this.state = {
      err: null,
      addPlayerSuccess: null,
      addPlayerError: null,
      allPlayersResult: [],
      allTeamsFetch: [],

      //player  attributes to update
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street: "",
      nationality: "",
      birthdate: "",
      city: "",
      licenseNotes: "",
      educationStatus: "",
      mothersName: "",
      salary: "",
      height: "",
      weight: "",
      position: "",
      date: "",
      team: "",

      //alert attributes
      show: true,
    };

    this.addPlayertoDB = this.addPlayertoDB.bind(this);
  }

  //save coach details to db
  addPlayertoDB() {
    const {
      firstName,
      lastName,
      email,
      phone,
      street,
      nationality,
      birthdate,
      city,
      licenseNotes,
      educationStatus,
      mothersName,
      salary,
      height,
      weight,
      position,
      date,
      team,
    } = this.state;

    let sexOrientation = document.getElementById("sexValue").value;
    let assignedTeam = document.getElementById("assignedTeamId").value;

    const playerData = {
      firstName,
      lastName,
      email,
      phone,
      street,
      nationality,
      sex: sexOrientation,
      birthdate,
      city,
      licenseNotes,
      educationStatus,
      mothersName,
      salary,
      height,
      weight,
      position,
      date,
      team: assignedTeam,
    };

    addNewPlayer(playerData)
      .then((addPlayerSuccess) =>
        this.setState({ addPlayerSuccess: addPlayerSuccess.data })
      )
      .catch((addPlayerError) => this.setState({ addPlayerError }));
  }

  componentDidMount() {
    /*  getAllPlayers()
      .then((result) => this.setState({ allPlayersResult: result.data }))
      .catch((err) => this.setState(err)); */
    getAllTeams()
      .then((result) => this.setState({ allTeamsFetch: result.data }))
      .catch((err) => this.setState({ err }));
  }

  render() {
    const {
      allPlayersResult,
      addPlayerSuccess,
      addPlayerError,
      allTeamsFetch,
      show,
      searchPlayer,
    } = this.state;
    if (this.props.location.state === undefined) {
      this.props.history.push("/");
      return null;
    } else {
      return (
        <>
          <Container fluid>
            {addPlayerSuccess ? (
              <Alert
                show={show}
                variant="success"
                onClose={(event) => this.setState({ show: false })}
                dismissible
              >
                <Alert.Heading>
                  Player added to system successfully
                </Alert.Heading>
              </Alert>
            ) : null}

            {addPlayerError ? (
              <Alert
                show={show}
                variant="danger"
                onClose={(event) => this.setState({ show: false })}
                dismissible
              >
                <Alert.Heading>Error adding player to the System</Alert.Heading>
                <p>Server might be down: or not available currently</p>
              </Alert>
            ) : null}

            <Row>
              <Col md="12">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4"></Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridFirstname">
                          <Form.Label>Firstname</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter Firstname"
                            onChange={(e) =>
                              this.setState({ firstName: e.target.value })
                            }
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastname">
                          <Form.Label>Lastname</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Password"
                            onChange={(e) =>
                              this.setState({ lastName: e.target.value })
                            }
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) =>
                              this.setState({ email: e.target.value })
                            }
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPhone">
                          <Form.Label>Phone:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="024xxxxxx"
                            onChange={(e) =>
                              this.setState({ phone: e.target.value })
                            }
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridbdate">
                          <Form.Label>Birthdate</Form.Label>
                          <Form.Control
                            type="date"
                            onChange={(e) =>
                              this.setState({ birthdate: e.target.value })
                            }
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGrideducation">
                          <Form.Label>Education Level:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="BSc"
                            onChange={(e) =>
                              this.setState({ educationStatus: e.target.value })
                            }
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridSalary">
                          <Form.Label>Salary</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="123xxx"
                            onChange={(e) =>
                              this.setState({ salary: e.target.value })
                            }
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGriddateAdd">
                          <Form.Label>Date added:</Form.Label>
                          <Form.Control
                            type="date"
                            onChange={(e) =>
                              this.setState({ date: e.target.value })
                            }
                          />
                        </Form.Group>
                      </Row>

                      <Row>
                        <Form.Group as={Col}>
                          <Form.Label>Street Address</Form.Label>
                          <Form.Control
                            placeholder="1234 Main St"
                            onChange={(e) =>
                              this.setState({ street: e.target.value })
                            }
                          />
                        </Form.Group>

                        <Form.Group as={Col}>
                          <Form.Label>ID Card</Form.Label>
                          <Form.Control
                            placeholder="dgsffads"
                            onChange={(e) =>
                              this.setState({ licenseNotes: e.target.value })
                            }
                          />
                        </Form.Group>

                        <Form.Group as={Col}>
                          <Form.Label>MothersName</Form.Label>
                          <Form.Control
                            placeholder="hello"
                            onChange={(e) =>
                              this.setState({ mothersName: e.target.value })
                            }
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridNation">
                          <Form.Label>Nationality</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              this.setState({ nationality: e.target.value })
                            }
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCity">
                          <Form.Label>City:</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              this.setState({ city: e.target.value })
                            }
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridSex">
                          <Form.Label>Sex:</Form.Label>
                          <Form.Control as="select" id="sexValue">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="transgender">Transgender</option>
                          </Form.Control>
                        </Form.Group>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group as={Col}>
                          <Form.Label>Height</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="6m"
                            onChange={(e) =>
                              this.setState({ height: e.target.value })
                            }
                          />
                        </Form.Group>

                        <Form.Group as={Col}>
                          <Form.Label>Weight</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="75kg"
                            onChange={(e) =>
                              this.setState({ weight: e.target.value })
                            }
                          />
                        </Form.Group>

                        <Form.Group as={Col}>
                          <Form.Label>Position</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              this.setState({ position: e.target.value })
                            }
                          />
                        </Form.Group>
                      </Row>

                      <Row>
                        <Form.Group as={Col} controlId="formGridFirstname">
                          <Form.Label>Assigned Team</Form.Label>
                          <Form.Control as="select" id="assignedTeamId">
                            {allTeamsFetch
                              ? allTeamsFetch.map((team) => (
                                  <option value={team._id}>
                                    {team.teamName ? team.teamName : null}
                                  </option>
                                ))
                              : null}
                          </Form.Control>
                        </Form.Group>
                      </Row>

                      <Button
                        variant="success"
                        onClick={() => this.addPlayertoDB()}
                      >
                        Add Player
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      );
    }
  }
}

export default Players;
