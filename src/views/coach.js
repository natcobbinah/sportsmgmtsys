import React, { Component } from "react";

import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  FormControl,
  Alert,
} from "react-bootstrap";

import Form from "react-bootstrap/Form";

import {
  getAllCoaches,
  addNewCoachAccount,
  updateCoachAccount,
  deleteCoachAccount,
} from "../httpEndpoints/sportsapiCoachesEndpoints";

import { getAllTeams } from "../httpEndpoints/sportsapiTeamsEndpoint";

class Coaches extends Component {
  constructor(props) {
    super(props);

    this.state = {
      err: null,
      addCoachSuccess: null,
      addCoachError: null,
      allCoachesResult: [],
      allTeamsFetch: [],

      //coach attributes to update
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street: "",
      nationality: "",
      birthdate: "",
      city: "",
      educationStatus: "",
      salary: "",
      date: "",
      team: "",

      //alert attributes
      show: true,
    };

    this.addCoachtoDB = this.addCoachtoDB.bind(this);
  }

  //save coach details to db
  addCoachtoDB() {
    const {
      firstName,
      lastName,
      email,
      phone,
      street,
      nationality,
      birthdate,
      city,
      educationStatus,
      salary,
      date,
      team,
    } = this.state;

    let sexOrientation = document.getElementById("sexValue").value;
    let assignedTeam = document.getElementById("assignedTeamId").value;

    const coachData = {
      firstName,
      lastName,
      email,
      phone,
      street,
      nationality,
      sex: sexOrientation,
      birthdate,
      city,
      educationStatus,
      salary,
      date,
      team: assignedTeam,
    };
    console.log(coachData);

    addNewCoachAccount(coachData)
      .then((addCoachSuccess) =>
        this.setState({ addCoachSuccess: addCoachSuccess.data })
      )
      .catch((err) => this.setState({ err }));
  }

  componentDidMount() {
    getAllCoaches()
      .then((result) => this.setState({ allCoachesResult: result.data }))
      .catch((err) => this.setState(err));

    getAllTeams()
      .then((result) => this.setState({ allTeamsFetch: result.data }))
      .catch((err) => this.setState({ err }));
  }

  render() {
    const {
      allCoachesResult,
      addCoachSuccess,
      addCoachError,
      show,
      allTeamsFetch,
    } = this.state;

    console.log(allCoachesResult);
    return (
      <>
        <Container fluid>
          {addCoachSuccess ? (
            <Alert
              show={show}
              variant="success"
              onClose={(event) => this.setState({ show: false })}
              dismissible
            >
              <Alert.Heading>Coach added to system successfully</Alert.Heading>
            </Alert>
          ) : null}

          {addCoachError ? (
            <Alert
              show={show}
              variant="danger"
              onClose={(event) => this.setState({ show: false })}
              dismissible
            >
              <Alert.Heading>Error adding coach to the System</Alert.Heading>
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

                    <Form.Group className="mb-3" controlId="formGridStreet">
                      <Form.Label>Street Address</Form.Label>
                      <Form.Control
                        placeholder="1234 Main St"
                        onChange={(e) =>
                          this.setState({ street: e.target.value })
                        }
                      />
                    </Form.Group>

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
                      onClick={() => this.addCoachtoDB()}
                    >
                      Add Coach
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

export default Coaches;
