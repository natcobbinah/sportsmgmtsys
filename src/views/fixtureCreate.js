import React, { Component } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Modal,
  Form,
  Alert,
  Table,
} from "react-bootstrap";

import { teamsLogos } from "../staticdata/staticdata";
import * as Icon from "react-bootstrap-icons";

import {
  addNewFixture,
  getAllFixtures,
  updateFixture,
  deleteFixture,
} from "../httpEndpoints/sportsapiFixturesEndpoints";

const fixturesState = {
  id: "",
  teamOne: "",
  teamTwo: "",
  scores: "",
  playatTimeDate: "",
  postPoned: "",
  playGround: "",
  city: "",
  winner: "",
  looser: "",
  draw: "",
  foul: "",
};

class Teams extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //show modal
      showModal: false,
      ...fixturesState,
      allFixturesResult: [],
      updateFixtureModal: false,
      showDeleteModal: false,

      //alert message
      show: true,
      showUpdateAlert: true,

      //submit _result
      fixturesResult: null,
      error: null,
      updateSuccess: null,
      updateError: null,
      deleteFixtureSuccess: null,
      deleteFixtureError: null,
    };

    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.addFixturetoDB = this.addFixturetoDB.bind(this);
    this.handleUpdateFixture = this.handleUpdateFixture.bind(this);
    this.handleUpdateFixtureCloseModal =
      this.handleUpdateFixtureCloseModal.bind(this);
    this.updateFixtureToDB = this.updateFixtureToDB.bind(this);
    this.deleteFixtureShowModal = this.deleteFixtureShowModal.bind(this);
    this.deleteFixturefromDB = this.deleteFixturefromDB.bind(this);
  }

  onFixtureChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleShowModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleUpdateFixtureCloseModal() {
    this.setState({
      updateFixtureModal: false,
    });
  }

  handleUpdateFixture(
    id,
    teamOne,
    scores,
    teamTwo,
    playatTimeDate,
    postPoned,
    playGround,
    city,
    winner,
    looser,
    foul,
    draw
  ) {
    this.setState({
      updateFixtureModal: true,
      id: id,
      teamOne,
      scores,
      teamTwo,
      playatTimeDate,
      postPoned,
      playGround,
      city,
      winner,
      looser,
      foul,
      draw,
    });
  }

  addFixturetoDB() {
    const {
      teamOne,
      teamTwo,
      scores,
      playatTimeDate,
      postPoned,
      playGround,
      city,
      winner,
      looser,
    } = this.state;

    let postPonedSelect = document.getElementById("postPonedValue").value;

    const fixturesData = {
      teamOne,
      teamTwo,
      scores,
      playatTimeDate,
      postPoned: postPonedSelect,
      playGround,
      city,
      winner,
      looser,
    };

    addNewFixture(fixturesData)
      .then((result) => this.setState({ fixturesResult: result.data }))
      .catch((err) => this.setState({ error: err }));
  }

  updateFixtureToDB() {
    const {
      id,
      teamOne,
      teamTwo,
      scores,
      playatTimeDate,
      postPoned,
      playGround,
      city,
      winner,
      looser,
      foul,
      draw,
    } = this.state;

    let drawSelect = document.getElementById("drawValue").value;

    const fixtureUpdateData = {
      _id: id,
      teamOne,
      teamTwo,
      scores,
      playatTimeDate,
      postPoned,
      playGround,
      city,
      winner,
      looser,
      foul,
      draw: drawSelect,
    };

    updateFixture(id, fixtureUpdateData)
      .then((result) => this.setState({ updateSuccess: result.data }))
      .then((error) => this.setState({ updateError: error }));
  }

  deleteFixtureShowModal(id) {
    this.setState({
      showDeleteModal: true,
      id: id,
    });
  }

  deleteFixturefromDB() {
    const { id } = this.state;
    deleteFixture(id)
      .then((result) => this.setState({ deleteFixtureSuccess: result.data }))
      .catch((error) => this.setState({ deleteFixtureError: error }));
  }

  componentDidMount() {
    getAllFixtures()
      .then((result) => this.setState({ allFixturesResult: result.data }))
      .catch((err) => this.setState(err));
  }

  render() {
    const {
      showModal,
      fixturesResult,
      show,
      error,
      allFixturesResult,
      updateFixtureModal,

      id,
      teamOne,
      scores,
      teamTwo,
      playatTimeDate,
      postPoned,
      playGround,
      city,
      winner,
      looser,
      foul,
      draw,
      updateSuccess,
      updateError,
      showUpdateAlert,
      showDeleteModal,
      deleteFixtureSuccess,
      deleteFixtureError,
    } = this.state;
    return (
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              <Button
                variant="primary"
                size="lg"
                className="mb-3"
                onClick={this.handleShowModal}
              >
                Add Fixture
              </Button>

              <Card>
                <Card.Header>
                  <Card.Title as="h4">All Fixtures</Card.Title>
                </Card.Header>

                <Card.Body className="all-icons">
                  {allFixturesResult ? (
                    <Table className="table-hover table-striped responsive">
                      <thead>
                        <tr>
                          <th className="border-0">Home Team</th>
                          <th className="border-0">Scores</th>
                          <th className="border-0">Away Team</th>
                          <th className="border-0">Winner</th>
                          <th className="border-0">Looser</th>
                          <th className="border-0">Update Fixtures</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allFixturesResult.map((fixture) => (
                          <tr key={fixture._id}>
                            <td>{fixture.teamOne}</td>
                            <td>{fixture.scores}</td>
                            <td>{fixture.teamTwo}</td>
                            <td>{fixture.winner}</td>
                            <td>{fixture.looser}</td>
                            <td>
                              <Button
                                className="mr-2"
                                onClick={() =>
                                  this.handleUpdateFixture(
                                    fixture._id,
                                    fixture.teamOne,
                                    fixture.scores,
                                    fixture.teamTwo,
                                    fixture.playatTimeDate,
                                    fixture.postPoned,
                                    fixture.playGround,
                                    fixture.city,
                                    fixture.winner,
                                    fixture.looser,
                                    fixture.fouls,
                                    fixture.draw
                                  )
                                }
                              >
                                <Icon.Book size={25} color="blue" />
                              </Button>
                              <Button
                                onClick={() =>
                                  this.deleteFixtureShowModal(fixture._id)
                                }
                              >
                                <Icon.Trash size={25} color="red" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : null}

                  {/* Delete User Modal */}
                  <Modal
                    show={showDeleteModal}
                    onHide={() => this.setState({ showDeleteModal: false })}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Delete Fixture</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {deleteFixtureSuccess ? (
                        <Alert
                          show={show}
                          variant="success"
                          onClose={(event) => this.setState({ show: false })}
                          dismissible
                        >
                          <Alert.Heading>
                            Fixture delete from system successfully
                          </Alert.Heading>
                        </Alert>
                      ) : null}
                      <p>Delete Fixture with id {id}</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={this.deleteFixturefromDB}
                      >
                        Yes
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() =>
                          this.setState({ showDeleteModal: false })
                        }
                      >
                        No
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  {/* End delete User Modal ends here */}
                  {/*  <Row>
                    {teamsLogos.map((team) => (
                      <Col
                        className="font-icon-list my-3 py-2"
                        lg="2"
                        md="3"
                        sm="4"
                        xs="6"
                      >
                        <img
                          className="imageItem w-100 p-10"
                          src={team.logo}
                          alt={team.logo}
                        />
                      </Col>
                    ))}
                  </Row> */}

                  <Modal
                    show={showModal}
                    onHide={this.handleCloseModal}
                    size="lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Add Fixture</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {fixturesResult ? (
                        <Alert
                          show={show}
                          variant="success"
                          onClose={(event) => this.setState({ show: false })}
                          dismissible
                        >
                          <Alert.Heading>
                            Fixtures added to system successfully
                          </Alert.Heading>
                        </Alert>
                      ) : null}
                      {error ? (
                        <Alert
                          show={show}
                          variant="danger"
                          onClose={(event) => this.setState({ show: false })}
                          dismissible
                        >
                          <Alert.Heading>
                            Error adding fixtures to system
                          </Alert.Heading>
                        </Alert>
                      ) : null}
                      <Form>
                        <Row className="mb-3">
                          <Form.Group as={Col}>
                            <Form.Label>TeamOne</Form.Label>
                            <Form.Control
                              type="text"
                              name="teamOne"
                              placeholder="Enter Team One"
                              onChange={this.onFixtureChange}
                            />
                          </Form.Group>

                          <Form.Group as={Col}>
                            <Form.Label>Scores</Form.Label>
                            <Form.Control
                              type="text"
                              name="scores"
                              placeholder="Enter scores"
                              onChange={this.onFixtureChange}
                            />
                          </Form.Group>

                          <Form.Group as={Col}>
                            <Form.Label>TeamTwo</Form.Label>
                            <Form.Control
                              type="text"
                              name="teamTwo"
                              placeholder="Enter Team Two"
                              onChange={this.onFixtureChange}
                            />
                          </Form.Group>
                        </Row>

                        <Row>
                          <Form.Group as={Col}>
                            <Form.Label>PlayAtDateTime</Form.Label>
                            <Form.Control
                              type="date"
                              name="playatTimeDate"
                              onChange={this.onFixtureChange}
                            />
                          </Form.Group>

                          <Form.Group as={Col}>
                            <Form.Label>PostPoned</Form.Label>
                            <Form.Control as="select" id="postPonedValue">
                              <option value="true">True</option>
                              <option value="false">False</option>
                            </Form.Control>
                          </Form.Group>
                        </Row>

                        <Row>
                          <Form.Group as={Col}>
                            <Form.Label>PlayGround</Form.Label>
                            <Form.Control
                              type="text"
                              name="playGround"
                              onChange={this.onFixtureChange}
                            />
                          </Form.Group>

                          <Form.Group as={Col}>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                              type="text"
                              name="city"
                              onChange={this.onFixtureChange}
                            />
                          </Form.Group>
                        </Row>

                        <Row>
                          <Form.Group as={Col}>
                            <Form.Label>Winner</Form.Label>
                            <Form.Control
                              type="text"
                              name="winner"
                              onChange={this.onFixtureChange}
                            />
                          </Form.Group>

                          <Form.Group as={Col}>
                            <Form.Label>Looser</Form.Label>
                            <Form.Control
                              type="text"
                              name="looser"
                              onChange={this.onFixtureChange}
                            />
                          </Form.Group>
                        </Row>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={this.addFixturetoDB}>
                        Add-Fixture
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  {/* Update Fixture Modal */}
                  <Modal
                    show={updateFixtureModal}
                    onHide={this.handleUpdateFixtureCloseModal}
                    size="lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Update Fixtures</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {updateSuccess ? (
                        <Alert
                          show={showUpdateAlert}
                          variant="success"
                          onClose={(event) =>
                            this.setState({ showUpdateAlert: false })
                          }
                          dismissible
                        >
                          <Alert.Heading>
                            Fixtures updated to system successfully
                          </Alert.Heading>
                        </Alert>
                      ) : null}
                      {updateError ? (
                        <Alert
                          show={shoshowUpdateAlertw}
                          variant="danger"
                          onClose={(event) =>
                            this.setState({ showUpdateAlert: false })
                          }
                          dismissible
                        >
                          <Alert.Heading>
                            Error updating fixtures to system
                          </Alert.Heading>
                        </Alert>
                      ) : null}
                      <Form>
                        <Row className="mb-3">
                          <Form.Group as={Col}>
                            <Form.Label>TeamOne</Form.Label>
                            <Form.Control
                              type="text"
                              name="teamOne"
                              value={teamOne}
                              onChange={this.onFixtureChange}
                            />
                          </Form.Group>

                          <Form.Group as={Col}>
                            <Form.Label>Scores</Form.Label>
                            <Form.Control
                              type="text"
                              name="scores"
                              value={scores}
                              onChange={this.onFixtureChange}
                            />
                          </Form.Group>

                          <Form.Group as={Col}>
                            <Form.Label>TeamTwo</Form.Label>
                            <Form.Control
                              type="text"
                              name="teamTwo"
                              value={teamTwo}
                              onChange={this.onFixtureChange}
                            />
                          </Form.Group>
                        </Row>

                        <Row>
                          <Form.Group as={Col}>
                            <Form.Label>Draw</Form.Label>
                            <Form.Control as="select" id="drawValue">
                              <option value="yes">Yes</option>
                              <option value="yes">No</option>
                            </Form.Control>
                          </Form.Group>

                          <Form.Group as={Col}>
                            <Form.Label>Add Fouls</Form.Label>
                            <Form.Control
                              type="text"
                              name="foul"
                              onChange={this.onFixtureChange}
                            />
                          </Form.Group>
                        </Row>

                        <Row>
                          <Form.Group as={Col}>
                            <Form.Label>PlayAtDateTime</Form.Label>
                            <Form.Control
                              type="text"
                              name="playatTimeDate"
                              value={playatTimeDate}
                              onChange={this.onFixtureChange}
                            />
                          </Form.Group>

                          <Form.Group as={Col}>
                            <Form.Label>PostPoned</Form.Label>
                            <Form.Control as="select" id="postPonedValue">
                              <option value="true">True</option>
                              <option value="false">False</option>
                            </Form.Control>
                          </Form.Group>
                        </Row>

                        <Row>
                          <Form.Group as={Col}>
                            <Form.Label>PlayGround</Form.Label>
                            <Form.Control
                              type="text"
                              name="playGround"
                              value={playGround}
                              onChange={this.onFixtureChange}
                            />
                          </Form.Group>

                          <Form.Group as={Col}>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                              type="text"
                              name="city"
                              value={city}
                              onChange={this.onFixtureChange}
                            />
                          </Form.Group>
                        </Row>

                        <Row>
                          <Form.Group as={Col}>
                            <Form.Label>Winner</Form.Label>
                            <Form.Control
                              type="text"
                              name="winner"
                              value={winner}
                              onChange={this.onFixtureChange}
                            />
                          </Form.Group>

                          <Form.Group as={Col}>
                            <Form.Label>Looser</Form.Label>
                            <Form.Control
                              type="text"
                              name="looser"
                              value={looser}
                              onChange={this.onFixtureChange}
                            />
                          </Form.Group>
                        </Row>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={this.updateFixtureToDB}
                      >
                        Update
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Teams;
