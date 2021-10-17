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
  Modal,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import {
  getAllPlayers,
  updatePlayer,
  deletePlayer,
} from "../httpEndpoints/sportsapiPlayersEndpoints";

import "./loader.css";

const searchForPlayer = (searchPlayer) => (player) =>
  player.firstName.toLowerCase().includes(searchPlayer.toLowerCase()) ||
  player.email.toLowerCase().includes(searchPlayer.toLowerCase()) ||
  player.phone.toLowerCase().includes(searchPlayer.toLowerCase());

class ViewPlayers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      err: null,
      editPlayerSuccess: null,
      editPlayerError: null,
      allPlayersResult: [],

      //searching for player in searchbar
      searchPlayer: "",

      //alert attributes
      show: false,
    };

    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.updatePlayer = this.updatePlayer.bind(this);
  }

  handleShowModal(
    id,
    firstName,
    lastName,
    email,
    Phone,
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
    date
  ) {
    this.setState({
      show: true,
      id,
      firstName,
      lastName,
      email,
      Phone,
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
    });
  }

  handleCloseModal() {
    this.setState({
      show: false,
    });
  }

  updatePlayer() {
    const {
      id,
      firstName,
      lastName,
      email,
      Phone,
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
      editPlayerSuccess,
    } = this.state;

    let sexOrientation = document.getElementById("sexValue").value;

    const playerData = {
      firstName,
      lastName,
      email,
      Phone,
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
    };

    updatePlayer(id, playerData)
      .then((result) => this.setState({ editPlayerSuccess: result.data }))
      .catch((err) => this.setState({ editPlayerError: err }));

    console.log(editPlayerSuccess);
  }

  componentDidMount() {
    getAllPlayers()
      .then((result) => this.setState({ allPlayersResult: result.data }))
      .catch((err) => this.setState(err));
  }

  render() {
    const {
      allPlayersResult,
      editPlayerSuccess,
      editPlayerError,
      show,
      id,
      firstName,
      lastName,
      email,
      Phone,
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
      searchPlayer,
    } = this.state;
    if (this.props.location.state === undefined) {
      this.props.history.push("/");
      return null;
    } else {
      return (
        <>
          <Container fluid>
            <div className="my-3">
              <InputGroup size="lg">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-lg">
                    Search
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Search by player name/email/contact"
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={(e) =>
                    this.setState({ searchPlayer: e.target.value })
                  }
                />
              </InputGroup>
            </div>

            <Row>
              <Col md="12">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4"></Card.Title>
                  </Card.Header>
                  <Card.Body>
                    {allPlayersResult ? (
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Sex</th>
                            <th>Salary</th>
                            <th>Height</th>
                            <th>Weight</th>
                            <th>Position</th>
                            <th>Edit Info</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allPlayersResult
                            .filter(searchForPlayer(searchPlayer))
                            .map((player) => (
                              <tr key={player._id}>
                                <td>{player.firstName}</td>
                                <td>{player.lastName}</td>
                                <td>{player.email}</td>
                                <td>{player.phone}</td>
                                <td>{player.sex}</td>
                                <td>{player.salary}</td>
                                <td>{player.height}</td>
                                <td>{player.weight}</td>
                                <td>{player.position}</td>
                                <td>
                                  <Button
                                    variant="outline-warning"
                                    onClick={() =>
                                      this.handleShowModal(
                                        player._id,
                                        player.firstName,
                                        player.lastName,
                                        player.email,
                                        player.phone,
                                        player.street,
                                        player.nationality,
                                        player.sex,
                                        player.birthdate,
                                        player.city,
                                        player.licenseNotes,
                                        player.educationStatus,
                                        player.mothersName,
                                        player.salary,
                                        player.height,
                                        player.weight,
                                        player.position,
                                        player.date
                                      )
                                    }
                                  >
                                    Edit
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    ) : (
                      <div className="loader">Loading...</div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {/*  <PlayerEditModal
            show={show}
            handleClose={this.handleCloseModal}
            id={id}
            firstName={firstName}
            lastName={lastName}
            email={email}
            Phone={Phone}
            street={street}
            nationality={nationality}
            birthdate={birthdate}
            city={city}
            licenseNotes={licenseNotes}
            educationStatus={educationStatus}
            mothersName={mothersName}
            salary={salary}
            height={height}
            weight={weight}
            position={position}
            date={date}
            onChange={this.onChange}
          /> */}
            <Modal show={show} onHide={this.handleCloseModal} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>All Player details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFirstname">
                      <Form.Label>Firstname</Form.Label>
                      <Form.Control
                        type="email"
                        value={firstName}
                        onChange={(e) =>
                          this.setState({ firstName: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastname">
                      <Form.Label>Lastname</Form.Label>
                      <Form.Control
                        type="text"
                        value={lastName}
                        onChange={(e) =>
                          this.setState({ lastName: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPhone">
                      <Form.Label>Phone:</Form.Label>
                      <Form.Control
                        type="text"
                        value={Phone}
                        onChange={(e) =>
                          this.setState({ Phone: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group as={Col}>
                      <Form.Label>Street Address</Form.Label>
                      <Form.Control
                        value={street}
                        onChange={(e) =>
                          this.setState({ street: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>ID Card</Form.Label>
                      <Form.Control
                        value={licenseNotes}
                        onChange={(e) =>
                          this.setState({ licenseNotes: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>MothersName</Form.Label>
                      <Form.Control
                        value={mothersName}
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
                        value={nationality}
                        onChange={(e) =>
                          this.setState({ nationality: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>City:</Form.Label>
                      <Form.Control
                        type="text"
                        value={city}
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
                    <Form.Group as={Col} controlId="formGridbdate">
                      <Form.Label>Birthdate</Form.Label>
                      <Form.Control
                        type="text"
                        value={birthdate}
                        onChange={(e) =>
                          this.setState({ birthdate: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGrideducation">
                      <Form.Label>Education Level:</Form.Label>
                      <Form.Control
                        type="text"
                        value={educationStatus}
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
                        value={salary}
                        onChange={(e) =>
                          this.setState({ salary: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGriddateAdd">
                      <Form.Label>Date added:</Form.Label>
                      <Form.Control type="text" value={date} />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col}>
                      <Form.Label>Height</Form.Label>
                      <Form.Control
                        type="text"
                        value={height}
                        onChange={(e) =>
                          this.setState({ height: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Weight</Form.Label>
                      <Form.Control
                        type="text"
                        value={weight}
                        onChange={(e) =>
                          this.setState({ weight: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Position</Form.Label>
                      <Form.Control
                        type="text"
                        value={position}
                        onChange={(e) =>
                          this.setState({ position: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.updatePlayer}>
                  Update Details
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
        </>
      );
    }
  }
}

export default ViewPlayers;
