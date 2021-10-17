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

import { teamStatistics } from "../staticdata/staticdata";
import * as Icon from "react-bootstrap-icons";

class TeamStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Row className="mt-3 pt-3">
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Table ( Team Statistics) </Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {teamStatistics ? (
                  <Table className="table-hover table-striped responsive">
                    <thead>
                      <tr>
                        <th className="border-0">#</th>
                        <th className="border-0">GP</th>
                        <th className="border-0">W</th>
                        <th className="border-0">D</th>
                        <th className="border-0">L</th>
                        <th className="border-0">GF</th>
                        <th className="border-0">GA</th>
                        <th className="border-0">GD</th>
                        <th className="border-0">Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamStatistics.map((stats, index) => (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>{stats.team}</td>
                          <td>{stats.gp}</td>
                          <td>{stats.w}</td>
                          <td>{stats.d}</td>
                          <td>{stats.L}</td>
                          <td>{stats.GF}</td>
                          <td>{stats.GA}</td>
                          <td>{stats.GD}</td>
                          <td>{stats.pt}</td>
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
    );
  }
}

export default TeamStatistics;
