import React, { useState } from "react";
import "./Header.css";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        {/* Logo Section */}
        <div className="logo">
          <a href="/">
            <img 
              src="https://w7.pngwing.com/pngs/541/840/png-transparent-logo-computer-icons-black-and-white-twitter-header-miscellaneous-monochrome-computer-wallpaper.png" 
              alt="Logo"
            />
          </a>
          <a href="/">MyWebsite</a>
        </div>

        {/* Navigation Menu */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <ul>
            {[
              { link: "/", name: "Home" },
              { link: "/about", name: "About" },
              { link: "/services", name: "Services" },
              { link: "/portfolio", name: "Portfolio" },
              { link: "/contact", name: "Contact" },
              { link: "/login", name: "Login" }
            ].map((item, index) => (
              <li key={index}><a href={item.link}>{item.name}</a></li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </div>
      </div>
    </header>
  );
};

export default Header;
