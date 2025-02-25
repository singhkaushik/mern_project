import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { FaFacebookF, FaTwitter, FaGooglePlusG } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-3">
      <div className="container">
        <div className="row">
          {/* Address Section */}
          <div className="col-md-4">
            <h4>Find Us</h4>
            <p><i className="fas fa-map-marker-alt"></i> 123 Lorem Ipsum, Street, XXXXXXX.</p>
          </div>

          {/* Contact Section */}
          <div className="col-md-4">
            <h4>Call Us</h4>
            <p><i className="fas fa-phone"></i>1-234-567-890</p>
          </div>

          {/* Mail Section */}
          <div className="col-md-4">
            <h4>Mail Us</h4>
            <p><i className="fas fa-envelope-open"></i> example@test.com</p>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="text-center mt-3">
          <span>Follow us: </span>
          <FaFacebookF className="mx-2" />
          <FaTwitter className="mx-2" />
          <FaGooglePlusG className="mx-2" />
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-3">
          <p>© 2025 All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
