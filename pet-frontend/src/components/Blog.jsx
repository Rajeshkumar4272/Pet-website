import React from "react";
import "../styles/Blog.css";
import blog1 from "../assets/blog1.jpg";
import blog2 from "../assets/blog2.jpg";

const Blog = () => {
  return (
    <section className="blog">
      <h2>Latest Pet Care Tips</h2>
      <div className="blog-container">
        <div className="blog-post">
          <img src={blog1} alt="Blog 1" />
          <h3>How to Keep Your Pet Healthy</h3>
          <button>Read More</button>
        </div>
        <div className="blog-post">
          <img src={blog2} alt="Blog 2" />
          <h3>Top 10 Pet Training Tips</h3>
          <button>Read More</button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
