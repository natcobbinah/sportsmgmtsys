import React, { Component } from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// react-bootstrap components
import {
  Alert,
  Badge,
  Button,
  Card,
  Modal,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Form,
  Table,
} from "react-bootstrap";
import {
  registerUser,
  getAllRegisteredUsers,
  deleteRegisteredUser,
} from "../httpEndpoints/sportsapiUserRegLoginEndpoints";
import * as Icon from "react-bootstrap-icons";

const searchForUser = (searchUser) => (user) =>
  user.firstName.toLowerCase().includes(searchUser.toLowerCase()) ||
  user.lastName.toLowerCase().includes(searchUser.toLowerCase()) ||
  user.role.toLowerCase().includes(searchUser.toLowerCase());

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      err: null,
      addUserSuccess: null,
      addUserError: null,
      allUsersFetch: [],
      removeUserSuccess: null,
      err: null,

      //search attributes
      searchUser: "",

      //alert attributes
      show: true,

      //modal attributes
      showModal: false,
      showDeleteModal: false,

      //user attributes
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };

    this.addUsertoDB = this.addUsertoDB.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.deleteUserfromDB = this.deleteUserfromDB.bind(this);
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

  deleteUser(userid) {
    this.setState({
      showDeleteModal: true,
      id: userid,
    });
  }

  addUsertoDB() {
    const { firstName, lastName, email, password } = this.state;
    let role = document.getElementById("roleValue").value;
    const userData = {
      firstName,
      lastName,
      email,
      password,
      role,
    };

    registerUser(userData)
      .then((addUserSuccess) =>
        this.setState({ addUserSuccess: addUserSuccess.data })
      )
      .catch((err) => this.setState({ err }));
  }

  deleteUserfromDB() {
    const { id } = this.state;
    deleteRegisteredUser(id)
      .then((removeUserSuccess) => this.setState({ removeUserSuccess }))
      .catch((err) => this.setState({ err }));
  }

  componentDidMount() {
    getAllRegisteredUsers()
      .then((result) => this.setState({ allUsersFetch: result.data }))
      .catch((err) => this.setState(err));
  }

  render() {
    const {
      addUserSuccess,
      addUserError,
      show,
      allUsersFetch,
      searchUser,
      showModal,
      showDeleteModal,
      id,
      removeUserSuccess,
    } = this.state;
    console.log(allUsersFetch);

    if (this.props.location.state === undefined) {
      this.props.history.push("/");
      return null;
    } else {
      return (
        <Container fluid>
          <Row>
            <Col md={3}>
              <Button
                variant="primary"
                size="lg"
                className="mb-3"
                onClick={this.handleShowModal}
              >
                Add User
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
                  {allUsersFetch ? (
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Firstname</th>
                          <th>Lastname</th>
                          <th>Email</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allUsersFetch
                          .filter(searchForUser(searchUser))
                          .map((user) => (
                            <tr key={user._id}>
                              <td>{user.firstName}</td>
                              <td>{user.lastName}</td>
                              <td>{user.email}</td>
                              <td>{user.role}</td>
                              <td>
                                <Button
                                  variant="danger"
                                  onClick={() => this.deleteUser(user._id)}
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

          {/* Delete User Modal */}
          <Modal
            show={showDeleteModal}
            onHide={() => this.setState({ showDeleteModal: false })}
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              {removeUserSuccess ? (
                <Alert
                  show={show}
                  variant="success"
                  onClose={(event) => this.setState({ show: false })}
                  dismissible
                >
                  <Alert.Heading>
                    User delete from system successfully
                  </Alert.Heading>
                </Alert>
              ) : null}
              <p>Delete user with id {id}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.deleteUserfromDB}>
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
          {/* End delete User Modal ends here */}
          <Modal show={showModal} onHide={this.handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {addUserSuccess ? (
                <Alert
                  show={show}
                  variant="success"
                  onClose={(event) => this.setState({ show: false })}
                  dismissible
                >
                  <Alert.Heading>
                    User added to system successfully
                  </Alert.Heading>
                </Alert>
              ) : null}
              {addUserError ? (
                <Alert
                  show={show}
                  variant="danger"
                  onClose={(event) => this.setState({ show: false })}
                  dismissible
                >
                  <Alert.Heading>Error adding user to the System</Alert.Heading>
                  <p>Server might be down: or not available currently</p>
                </Alert>
              ) : null}
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridFirstname">
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control
                      type="text"
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
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Role</Form.Label>
                    <Form.Control as="select" id="roleValue">
                      <option value="admin">Admin</option>
                      <option value="coach">Coach</option>
                      <option value="supporter">Supporter</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.addUsertoDB}>
                AddUser
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      );
    }
  }
}

export default Users;
