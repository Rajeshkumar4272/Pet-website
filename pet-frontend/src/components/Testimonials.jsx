import React from "react";
import "../styles/Testimonials.css";
import customer1 from "../assets/customer3.jpg";
import customer2 from "../assets/customer2.jpg";

const testimonialsData = [
  {
    id: 1,
    name: "Sarah J.",
    review: "Amazing service! My dog loves the food and toys!",
    image: customer1,
    rating: "⭐⭐⭐⭐⭐",
  },
  {
    id: 2,
    name: "Mark R.",
    review: "Great veterinary care and quick support.",
    image: customer2,
    rating: "⭐⭐⭐⭐⭐",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>What Our Customers Say</h2>
      <div className="testimonials-container">
        {testimonialsData.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <img src={testimonial.image} alt={testimonial.name} />
            <h3>{testimonial.name}</h3>
            <p>{testimonial.review}</p>
            <span>{testimonial.rating}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
