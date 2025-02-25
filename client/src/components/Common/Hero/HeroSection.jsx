import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Hero.css"; // Ensure CSS file is correctly imported

const HeroSection = () => {
  return (
    <section className="hero-section">
      {/* Background Video */}
      <video autoPlay loop muted className="hero-video">
        <source src="https://cdn.dribbble.com/userupload/31953465/file/large-d8a79386445af268b43a2f113faa3ef0.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="hero-overlay"></div>

      {/* Hero Content */}
      <Container className="hero-content text-center">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <h1 className="display-4 fw-bold">Welcome to Our Role-Based Access Control Web Application</h1>
            <p className="lead">
              Manage your RBAC efficiently with our powerful tools and seamless experience.
            </p>
            <Button variant="primary" size="lg" className="mt-3">
              Get Started
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
