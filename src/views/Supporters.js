import React, { Component } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import {
  getAllSupporters,
  getAllSupporterCommentsByEmail,
  createNewSupporterAccount,
  updateSupporterAccount,
  deleteSupporterById,
} from "../httpEndpoints/sportsapiSupportersEndpoints";

import ViewSupporterDetails from "./supportersEditModal";
import * as Icon from "react-bootstrap-icons";

const searchForSupporter = (searchSupporter) => (supporter) =>
  supporter.firstName.toLowerCase().includes(searchSupporter.toLowerCase()) ||
  supporter.email.toLowerCase().includes(searchSupporter.toLowerCase()) ||
  supporter.phone.toLowerCase().includes(searchSupporter.toLowerCase());

class Supporters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      err: null,
      allSupportersResult: [],

      //set modalState
      show: false,

      //searching for supporter in searchbar
      searchSupporter: "",

      //supporter data to edit
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street: "",
      sex: "",
      nationality: "",
      birthdate: "",
      date: "",
      comments: "",
      tickets: "",
    };

    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleShowModal(
    id,
    firstName,
    lastName,
    email,
    phone,
    street,
    sex,
    nationality,
    birthdate,
    date,
    comments,
    tickets
  ) {
    this.setState({
      show: true,
      id,
      firstName,
      lastName,
      email,
      phone,
      street,
      sex,
      nationality,
      birthdate,
      date,
      comments,
      tickets,
    });
  }
  handleCloseModal() {
    this.setState({
      show: false,
    });
  }

  componentDidMount() {
    getAllSupporters()
      .then((result) => this.setState({ allSupportersResult: result.data }))
      .catch((err) => this.setState(err));
  }

  render() {
    const {
      allSupportersResult,
      id,
      firstName,
      lastName,
      email,
      phone,
      street,
      sex,
      nationality,
      birthdate,
      date,
      comments,
      tickets,
      searchSupporter,
    } = this.state;
    console.log(allSupportersResult);
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
                  placeholder="Search by supporters name/email/contact"
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={(e) =>
                    this.setState({ searchSupporter: e.target.value })
                  }
                />
              </InputGroup>
            </div>

            <ViewSupporterDetails
              show={this.state.show}
              handleClose={this.handleCloseModal}
              supportersData={allSupportersResult}
              id={id}
              firstName={firstName}
              lastName={lastName}
              email={email}
              phone={phone}
              street={street}
              sex={sex}
              nationality={nationality}
              birthdate={birthdate}
              date={date}
              comments={comments}
              tickets={tickets}
            />

            <Row>
              <Col md="12">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4"></Card.Title>
                  </Card.Header>
                  <Card.Body>
                    {allSupportersResult ? (
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Street</th>
                            <th>Sex</th>
                            <th>Nationality</th>
                            <th>View FullDetails</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allSupportersResult
                            .filter(searchForSupporter(searchSupporter))
                            .map((teamfan) => (
                              <tr key={teamfan._id}>
                                <td>{teamfan.firstName}</td>
                                <td>{teamfan.lastName}</td>
                                <td>{teamfan.email}</td>
                                <td>{teamfan.phone}</td>
                                <td>{teamfan.street}</td>
                                <td>{teamfan.sex}</td>
                                <td>{teamfan.nationality}</td>
                                <td>
                                  <Button
                                    variant="outline-warning"
                                    onClick={() =>
                                      this.handleShowModal(
                                        teamfan._id,
                                        teamfan.firstName,
                                        teamfan.lastName,
                                        teamfan.email,
                                        teamfan.phone,
                                        teamfan.street,
                                        teamfan.sex,
                                        teamfan.nationality,
                                        teamfan.birthdate,
                                        teamfan.date,
                                        teamfan.comments,
                                        teamfan.tickets
                                      )
                                    }
                                  >
                                    <Icon.Book size={25} color="blue" />
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
          </Container>
        </>
      );
    }
  }
}

export default Supporters;
