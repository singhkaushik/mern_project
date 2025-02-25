import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css";

const About = () => {
  return (
    <section className="about-page-section">
    {/* Title Section - Centered */}
    <div className="sec-title">
          <p className="title">About Us _____</p>
          <h2>Who We Are & What We Do</h2>
        </div>
      <Container>
        

        {/* About Content */}
        <Row className="align-items-center">
          {/* Video Column */}
          <Col md={6} className="video-column">
            <video autoPlay loop muted playsInline className="about-video">
              <source src="https://cdn.dribbble.com/userupload/4486178/file/original-de6f07c23c34f33bf88684654802fac2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Col>

          {/* Text Column */}
          <Col md={6} className="text-column">
            <h3>Our Journey</h3>
            <p>
              We are a passionate team dedicated to delivering high-quality services. With years of experience, 
              we have been helping clients achieve their goals with innovative solutions and a commitment to excellence.
            </p>
            <h3>Why Choose Us?</h3>
            <ul className="about-list">
              <li>✔ Experienced & Skilled Team</li>
              <li>✔ Customer Satisfaction is Our Priority</li>
              <li>✔ Innovative and Reliable Solutions</li>
              <li>✔ 24/7 Support & Assistance</li>
            </ul>
            <Button className="theme-btn">Learn More</Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
