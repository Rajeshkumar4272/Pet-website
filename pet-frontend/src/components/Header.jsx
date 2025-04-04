import React from "react";
import "../styles/Header.css"; // Importing external CSS

const Header = () => {
  return (
    <header className="header">
      <div className="logo">🐾 Pet Haven</div>
      <nav className="nav-menu">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Feature</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#shop">Testimonial</a></li>
          <li><a href="#blog">Blog</a></li>
          
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <button className="cta-button">Adopt Now</button>
    </header>
  );
};

export default Header;
