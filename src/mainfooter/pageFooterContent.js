import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./footer.css";
import * as Icon from "react-bootstrap-icons";

const PageFooterContent = () => {
  return (
    <Container className="footerContent" fluid>
      <Row>
        <Col className="mt-4 pt-4" md={3}></Col>
        <Col className="mt-3 pt-3 text-center font-weight-bold" md={6}>
          <div className="icon mr-4">
            <Icon.Whatsapp size={50} className="my-2" color="green" />
          </div>
          <div className="icon mr-4">
            <Icon.Facebook size={50} className="my-2" color="blue" />
          </div>
          <div className="icon mr-4">
            <Icon.Twitter size={50} className="my-2" color="royalblue" />
          </div>
          <div className="icon mr-4">
            <Icon.Twitch size={50} className="my-2" color="red" />
          </div>
        </Col>
        <Col className="mt-4 pt-4" md={3}></Col>
      </Row>
    </Container>
  );
};

export default PageFooterContent;
