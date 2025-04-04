import React from "react";
import "../styles/Hero.css"; // Import external CSS
import heroImage from "../assets/hero3.png"; // Ensure you have an image in src/assets

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Give Your Pet the Best Care 🐶🐱</h1>
        <p>Find the best food, toys, and health essentials for your furry friend.</p>
        <div className="hero-buttons">
          <button className="shop-btn">Shop Now</button>
          <button className="adopt-btn">Adopt a Pet</button>
        </div>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="Happy pets" />
      </div>
    </section>
  );
};

export default Hero;
