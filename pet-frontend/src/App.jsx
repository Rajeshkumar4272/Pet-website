import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

function App() {

  return (
    <div className="p-4 font-sans text-center bg-pink-50 min-h-screen">
      <Header />
      <Hero />
      <Features />
      <About />
      <Testimonials />
      <Blog />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
