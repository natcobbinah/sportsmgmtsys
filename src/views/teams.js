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
  Table,
  Modal,
  InputGroup,
} from "react-bootstrap";

import Form from "react-bootstrap/Form";

import {
  getAllTeams,
  addNewTeam,
  deleteTeam,
} from "../httpEndpoints/sportsapiTeamsEndpoint";
import * as Icon from "react-bootstrap-icons";

const searchForTeam = (searchTeam) => (team) =>
  team.teamName.toLowerCase().includes(searchTeam.toLowerCase());

class Team extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allTeamsFetch: [],
      err: null,
      addTeamSuccess: null,
      addTeamError: null,
      deleteTeamSuccess: null,

      //alert attributes
      show: true,

      //search attributes
      searchTeam: "",

      //modal attributes
      showModal: false,
      showDeleteModal: false,

      //team attributes
      id: "",
      teamName: "",
      teamOwner: "",
      yearEstablished: "",
    };

    this.addTeamtoDB = this.addTeamtoDB.bind(this);
    this.deleteTeam = this.deleteTeam.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.deleteTeam = this.deleteTeam.bind(this);
    this.deleteTeamfromDB = this.deleteTeamfromDB.bind(this);
  }

  handleShowModal() {
    this.setState({
      showModal: true,
    });
  }

  handleCloseModal() {
    this.setState({
      showModal: false,
    });
  }

  deleteTeam(teamid) {
    this.setState({
      showDeleteModal: true,
      id: teamid,
    });
  }

  addTeamtoDB() {
    const { teamName, teamOwner, yearEstablished } = this.state;
    const teamData = {
      teamName,
      teamOwner,
      yearEstablished,
    };

    addNewTeam(teamData)
      .then((addTeamSuccess) =>
        this.setState({ addTeamSuccess: addTeamSuccess.data })
      )
      .catch((err) => this.setState({ addTeamError: err }));

    this.componentDidMount();
  }

  deleteTeamfromDB() {
    const { id } = this.state;
    deleteTeam(id)
      .then((deleteTeamSuccess) => this.setState({ deleteTeamSuccess }))
      .catch((err) => this.setState({ err }));
  }

  componentDidMount() {
    getAllTeams()
      .then((result) => this.setState({ allTeamsFetch: result.data }))
      .catch((err) => this.setState({ err }));
  }

  render() {
    const {
      allTeamsFetch,
      err,
      addTeamSuccess,
      addTeamError,
      deleteTeamSuccess,
      show,
      id,
      searchTeam,
      showModal,
      showDeleteModal,
    } = this.state;
    return (
      <Container>
        <div className="my-3">
          <InputGroup size="lg">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-lg">
                Search
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Search team"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => this.setState({ searchTeam: e.target.value })}
            />
          </InputGroup>
        </div>

        <Row>
          <Col md={3}>
            <Button
              variant="primary"
              size="lg"
              className="mb-3"
              onClick={this.handleShowModal}
            >
              Add Team
            </Button>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4"></Card.Title>
              </Card.Header>
              <Card.Body>
                {allTeamsFetch ? (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Owner</th>
                        <th>EstablishedDate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTeamsFetch
                        .filter(searchForTeam(searchTeam))
                        .map((team) => (
                          <tr key={team._id}>
                            <td>{team.teamName}</td>
                            <td>{team.teamOwner}</td>
                            <td>{team.yearEstablished}</td>
                            <td>
                              <Button
                                variant="danger"
                                onClick={() => this.deleteTeam(team._id)}
                              >
                                <Icon.Trash size={25} color="red" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                ) : null}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Delete Team Modal */}
        <Modal
          show={showDeleteModal}
          onHide={() => this.setState({ showDeleteModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Team</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            {deleteTeamSuccess ? (
              <Alert
                show={show}
                variant="success"
                onClose={(event) => this.setState({ show: false })}
                dismissible
              >
                <Alert.Heading>
                  Team delete from system successfully
                </Alert.Heading>
              </Alert>
            ) : null}
            <p>Delete team with id {id}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.deleteTeamfromDB}>
              Yes
            </Button>
            <Button
              variant="primary"
              onClick={() => this.setState({ showDeleteModal: false })}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
        {/* End delete Team Modal ends here */}
        <Modal show={showModal} onHide={this.handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add Team</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {addTeamSuccess ? (
              <Alert
                show={show}
                variant="success"
                onClose={(event) => this.setState({ show: false })}
                dismissible
              >
                <Alert.Heading>Team added to system successfully</Alert.Heading>
              </Alert>
            ) : null}
            {addTeamError ? (
              <Alert
                show={show}
                variant="danger"
                onClose={(event) => this.setState({ show: false })}
                dismissible
              >
                <Alert.Heading>Error adding Team to the System</Alert.Heading>
                <p>Server might be down: or not available currently</p>
              </Alert>
            ) : null}
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridFirstname">
                  <Form.Label>TeamName</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter TeamName"
                    onChange={(e) =>
                      this.setState({ teamName: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastname">
                  <Form.Label>TeamOwner</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter TeamOwner"
                    onChange={(e) =>
                      this.setState({ teamOwner: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>

              <Form.Group as={Col} controlId="formGriddateAdd">
                <Form.Label>Date Established</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) =>
                    this.setState({ yearEstablished: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.addTeamtoDB}>
              AddTeam
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default Team;
