import React from "react";
import "../styles/Newsletter.css";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <h2>Subscribe for Exclusive Pet Tips</h2>
      <form>
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Subscribe</button>
      </form>
    </section>
  );
};

export default Newsletter;
