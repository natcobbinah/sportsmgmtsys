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
  Form,
  Modal,
  Alert,
} from "react-bootstrap";

import "./welcome.css";
import {
  registerUser,
  loginUser,
} from "../httpEndpoints/sportsapiUserRegLoginEndpoints";

import { createNewSupporterAccount } from "../httpEndpoints/sportsapiSupportersEndpoints";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const SIGNUP_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  street: "",
  nationality: "",
  birthdate: "",
  city: "",
  educationStatus: "",
  date: "",
};

import { sportNews } from "../staticdata/staticdata";

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
      ...SIGNUP_STATE,
      errorLogin: null,
      successLogin: null,
      allRegisteredUsers: [],
      err: null,
      onRegisterSuccess: null,
      onError: null,
      //modal attributes
      show: false,
      showSignUp: false,

      //alert attributes
      showAlert: true,
      showAlertSignup: true,

      //news
      image: null,
      description: "",
      fulldescription: "",
    };

    this.newsInfo = this.newsInfo.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    this.handleLoginShowModal = this.handleLoginShowModal.bind(this);
    this.handleSignUpShowModal = this.handleSignUpShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleCloseSignUpModal = this.handleCloseSignUpModal.bind(this);
  }

  newsInfo(image, description, fulldescription) {
    this.setState({ image, description, fulldescription });
    let newsData = {
      image,
      description,
      fulldescription,
    };
    this.props.history.push({
      pathname: "/newsfull",
      state: newsData,
    });
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSignupChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLoginSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    const logindata = {
      email,
      password,
    };

    loginUser(logindata)
      .then((result) => this.setState({ successLogin: result.data }))
      .catch((err) => this.setState({ errorLogin: err }));

    this.setState({
      show: false,
    });
  }

  handleSignupSubmit(event) {
    event.preventDefault();
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
      date,
    } = this.state;

    let sexOrientation = document.getElementById("sexValue").value;

    const supporterData = {
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
      date,
    };

    createNewSupporterAccount(supporterData)
      .then((success) => this.setState({ onRegisterSuccess: success }))
      .catch((error) => this.setState({ onError: error }));

    //close signup Modal
    this.setState({
      showSignUp: false,
    });
  }

  handleLoginShowModal() {
    this.setState({
      show: true,
    });
  }

  handleSignUpShowModal() {
    this.setState({
      showSignUp: true,
    });
  }

  handleCloseSignUpModal() {
    this.setState({
      showSignUp: false,
    });
  }

  handleCloseModal() {
    this.setState({
      show: false,
    });
  }

  componentDidMount() {}

  render() {
    const {
      show,
      errorLogin,
      successLogin,
      email,
      password,
      allRegisteredUsers,
      showAlert,
      showSignUp,
      onRegisterSuccess,
      onError,
      showAlertSignup,
    } = this.state;

    return (
      <Container fluid className="sports">
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          fixed="top"
        >
          <Navbar.Brand href="/">SPMS</Navbar.Brand>
          <Nav className="ml-5">
            <Nav.Link href="/fixtures">Fixtures</Nav.Link>
          </Nav>
          <Nav className="mr-3">
            <Nav.Link href="/teamStats">Teams-Statistics</Nav.Link>
          </Nav>
          <Nav className="mr-auto">
            <Nav.Link href="/teamPlusData">Teams</Nav.Link>
          </Nav>

          {errorLogin ? (
            <Alert
              show={showAlert}
              variant="danger"
              onClose={(event) => this.setState({ showAlert: false })}
              dismissible
            >
              <Alert.Heading>Invalid Credentials: Try Again</Alert.Heading>
            </Alert>
          ) : null}
          {successLogin
            ? //redirect to main dashboard
              this.props.history.push({
                pathname: "/admin/dashboard",
                state: successLogin,
              })
            : null}
          {/* Registration success and error object */}
          {onRegisterSuccess ? (
            <Alert
              show={showAlertSignup}
              variant="success"
              onClose={(event) => this.setState({ showAlertSignup: false })}
              dismissible
            >
              <Alert.Heading>Registered Successfully</Alert.Heading>
            </Alert>
          ) : null}
          {onError ? (
            <Alert
              show={showAlertSignup}
              variant="success"
              onClose={(event) => this.setState({ showAlertSignup: false })}
              dismissible
            >
              <Alert.Heading>
                Error during registration: Try Again
              </Alert.Heading>
            </Alert>
          ) : null}
          {/* end Registration success and error object */}
          <Nav>
            <Button
              variant="outline-primary"
              onClick={this.handleLoginShowModal}
            >
              Login(Admin/Coach)
            </Button>
            <Button
              variant="outline-secondary"
              onClick={this.handleSignUpShowModal}
            >
              SignUp(TeamFan)
            </Button>
          </Nav>
        </Navbar>
        <LoginForm
          show={show}
          handleClose={this.handleCloseModal}
          loginSubmit={this.handleLoginSubmit}
          onChange={this.onChange}
        />
        <SignUpForm
          show={showSignUp}
          handleSignUpClose={this.handleCloseSignUpModal}
          onChangeSignUp={this.onSignupChange}
          signUpSubmit={this.handleSignupSubmit}
        />
        <Row className="mt-5 pt-5">
          {sportNews.map((news, index) => (
            <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 my-2">
              <div class="hovereffect">
                <img
                  class="img-responsive"
                  src={news.image}
                  alt=""
                  width="1050"
                  height="350"
                />
                <div class="overlay">
                  <h2>{news.description}</h2>
                  <p>
                    {/*  <a href={news.link} target="_blank">
                      View NEWS
                    </a> */}
                    <Button
                      variant="danger"
                      size="lg"
                      className="mb-3"
                      onClick={() =>
                        this.newsInfo(
                          news.image,
                          news.description,
                          news.fulldescription
                        )
                      }
                    >
                      View News
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Row>
      </Container>
    );
  }
}

const LoginForm = ({ show, handleClose, loginSubmit, onChange }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>LOGIN PAGE</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  size="lg"
                  placeholder="Enter email"
                  onChange={onChange}
                />

                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  size="lg"
                  placeholder="Password"
                  onChange={onChange}
                />
              </Form.Group>

              <Button
                variant="secondary"
                type="submit"
                block
                onClick={loginSubmit}
              >
                Submit
              </Button>
            </Row>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

const SignUpForm = ({
  show,
  handleSignUpClose,
  signUpSubmit,
  onChangeSignUp,
}) => {
  return (
    <Modal show={show} onHide={handleSignUpClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>SIGNUP PAGE</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridFirstname">
                <Form.Label>Firstname</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="Enter Firstname"
                  onChange={onChangeSignUp}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastname">
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="surname"
                  onChange={onChangeSignUp}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={onChangeSignUp}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Phone:</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="024xxxxxx"
                  onChange={onChangeSignUp}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridbdate">
                <Form.Label>Birthdate</Form.Label>
                <Form.Control
                  type="date"
                  name="birthdate"
                  onChange={onChangeSignUp}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGrideducation">
                <Form.Label>Education Level:</Form.Label>
                <Form.Control
                  type="text"
                  name="educationStatus"
                  placeholder="BSc"
                  onChange={onChangeSignUp}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGriddateAdd">
                <Form.Label>Date added:</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  onChange={onChangeSignUp}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridStreet">
                <Form.Label>Street Address</Form.Label>
                <Form.Control
                  placeholder="1234 Main St"
                  name="street"
                  onChange={onChangeSignUp}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridNation">
                <Form.Label>Nationality</Form.Label>
                <Form.Control
                  type="text"
                  name="nationality"
                  onChange={onChangeSignUp}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City:</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  onChange={onChangeSignUp}
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

            <Button variant="success" onClick={signUpSubmit}>
              Register Account
            </Button>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default Welcome;
