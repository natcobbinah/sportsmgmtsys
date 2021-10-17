import Modal from "react-bootstrap/Modal";
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
} from "react-bootstrap";

function ViewSupporterDetails({
  show,
  handleClose,
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
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Supporter Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Firstname</Form.Label>
                <Form.Control type="text" value={firstName} />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Lastname</Form.Label>
                <Form.Control type="text" value={lastName} />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Date Registered</Form.Label>
                <Form.Control type="text" value={date} />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" value={email} />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" value={phone} />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Street</Form.Label>
                <Form.Control type="text" value={street} />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Sex</Form.Label>
                <Form.Control type="text" value={sex} />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Nationality</Form.Label>
                <Form.Control type="text" value={nationality} />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Birthdate</Form.Label>
                <Form.Control type="text" value={birthdate} />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Comments</Form.Label>
                {comments
                  ? comments.map((comment) => (
                      <Form.Control
                        as="textarea"
                        rows={2}
                        className="mb-3"
                        value={comment.description}
                      />
                    ))
                  : null}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Tickets</Form.Label>
                {tickets
                  ? tickets.map((ticket) => (
                      <Form.Control
                        as="textarea"
                        rows={2}
                        className="mb-3"
                        value={ticket.ticketNo}
                      />
                    ))
                  : null}
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewSupporterDetails;
