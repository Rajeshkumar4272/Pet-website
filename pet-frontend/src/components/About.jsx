import React from "react";
import "../styles/About.css";
import aboutImage from "../assets/about.jpg";

const About = () => {
  return (
    <section className="about">
      <div className="about-content">
        <h2>About Us</h2>
        <p>
          Our mission is to provide the best care for your pets. We offer high-quality food, toys, and health services to ensure a happy life for your furry friends.
        </p>
        <button className="read-more">Read More</button>
      </div>
      <div className="about-image">
        <img src={aboutImage} alt="Pets and Humans" />
      </div>
    </section>
  );
};

export default About;
