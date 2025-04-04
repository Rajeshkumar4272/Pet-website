import React from "react";
import "../styles/Features.css"; // Import external CSS
import petFood from "../assets/pet-food.png"; // Example image
import vetCare from "../assets/vet-care.jpg";
import petToys from "../assets/pet-toys.png";

const featuresData = [
  {
    id: 1,
    title: "Quality Pet Food",
    description: "Nutritious and healthy food for your pets.",
    image: petFood,
  },
  {
    id: 2,
    title: "Veterinary Care",
    description: "Best healthcare services for your furry friends.",
    image: vetCare,
  },
  {
    id: 3,
    title: "Fun Pet Toys",
    description: "Interactive toys to keep your pets happy.",
    image: petToys,
  },
];

const Features = () => {
  return (
    <section className="features">
      <h2>Our Services & Offerings</h2>
      <div className="features-container">
        {featuresData.map((feature) => (
          <div key={feature.id} className="feature-card">
            <img src={feature.image} alt={feature.title} />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
