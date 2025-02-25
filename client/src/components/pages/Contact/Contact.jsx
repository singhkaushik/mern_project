import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaGooglePlusG, FaDribbble, FaPinterestP } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact-page-section">
     <div className="sec-title ">
          <p className="title">Contact Us _____</p>
          <h2>Let's Get in Touch.</h2>
        </div>
      <Container>
        <div className="contact-container">
          <Row className="g-0">
            <Col md={8} className="form-column">
              <div className="form-box">
                <Form method="post" action="sendemail.php" id="contact-form">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Control type="text" name="name" placeholder="Name" required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Control type="email" name="email" placeholder="Email" required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Control type="text" name="subject" placeholder="Subject" required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Control type="text" name="phone" placeholder="Phone" required />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Control as="textarea" name="message" rows={4} placeholder="Message" required />
                      </Form.Group>
                    </Col>
                    <Col md={12} className="text-center">
                      <Button type="submit" className="theme-btn">
                        Send Now
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>

            <Col md={4} className="info-column">
              <div className="info-box">
                <h3>Contact Info</h3>
                <ul className="list-info">
                  <li><FaMapMarkerAlt className="me-2" /> 123 Lorem Ipsum, Street, XXXXXXX.</li>
                  <li><FaEnvelope className="me-2" /> example@test.com</li>
                  <li><FaPhone className="me-2" /> 1-234-567-890</li>
                </ul>

                {/* Social Media Icons */}
                <div className="social-icons">
                  <span>Follow us:</span>
                  <a href="#"><FaFacebookF /></a>
                  <a href="#"><FaTwitter /></a>
                  <a href="#"><FaGooglePlusG /></a>
                  <a href="#"><FaDribbble /></a>
                  <a href="#"><FaPinterestP /></a>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
