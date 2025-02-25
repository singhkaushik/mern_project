import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaCode,
  FaMobileAlt,
  FaLaptopCode,
  FaDatabase,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Services.css";

const Services = () => {
  return (
    <section className="services-page-section">
      {/* Title Section */}
      <div className="sec-title ">
        <p className="title">Our Services _____</p>
        <h2>What We Offer</h2>
      </div>
      <Container>
        {/* Services Grid */}
        <Row className="g-4">
          {/* Service 1 */}
          <Col md={4} sm={6}>
            <Card className="service-card">
              <div className="icon-box">
                <FaCode />
              </div>
              <Card.Body>
                <Card.Title>Web Development</Card.Title>
                <Card.Text>
                  We build responsive and scalable web applications tailored to
                  your needs.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Service 2 */}
          <Col md={4} sm={6}>
            <Card className="service-card">
              <div className="icon-box">
                <FaMobileAlt />
              </div>
              <Card.Body>
                <Card.Title>Mobile App Development</Card.Title>
                <Card.Text>
                  We create seamless and high-performance mobile applications.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Service 3 */}
          <Col md={4} sm={6}>
            <Card className="service-card">
              <div className="icon-box">
                <FaLaptopCode />
              </div>
              <Card.Body>
                <Card.Title>UI/UX Design</Card.Title>
                <Card.Text>
                  We design user-friendly interfaces with great user experience.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Service 4 */}
          <Col md={4} sm={6}>
            <Card className="service-card">
              <div className="icon-box">
                <FaDatabase />
              </div>
              <Card.Body>
                <Card.Title>Database Management</Card.Title>
                <Card.Text>
                  We provide secure and optimized database solutions.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Service 5 */}
          <Col md={4} sm={6}>
            <Card className="service-card">
              <div className="icon-box">
                <FaChartLine />
              </div>
              <Card.Body>
                <Card.Title>SEO & Digital Marketing</Card.Title>
                <Card.Text>
                  We help your business grow with SEO and marketing strategies.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Service 6 */}
          <Col md={4} sm={6}>
            <Card className="service-card">
              <div className="icon-box">
                <FaShieldAlt />
              </div>
              <Card.Body>
                <Card.Title>Cyber Security</Card.Title>
                <Card.Text>
                  We provide secure solutions to protect your business from
                  threats.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Services;
