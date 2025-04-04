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
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState({ name: '', price: '' });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchFood();
  }, []);

  const fetchFood = () => {
    axios.get("http://localhost:5000/api/food")
      .then(res => setFoods(res.data))
      .catch(() => toast.error("Failed to load food data!"));
  };

  const validate = (food) => {
    if (!food.name.trim() || !food.price.trim()) {
      toast.warning("Please fill both Name & Price properly!");
      return false;
    }
    return true;
  };

  const addFood = () => {
    if (!validate(newFood)) return;
    axios.post("http://localhost:5000/api/food", newFood)
      .then(() => {
        toast.success("Food added successfully! 🐾");
        setNewFood({ name: '', price: '' });
        fetchFood();
      }).catch(() => toast.error("Error adding food!"));
  };

  const deleteFood = (id) => {
    axios.delete(`http://localhost:5000/api/food/${id}`)
      .then(() => {
        toast.success("Food deleted! 🐾");
        fetchFood();
      }).catch(() => toast.error("Error deleting food!"));
  };

  const updateFood = () => {
    if (!validate(editing)) return;
    axios.put(`http://localhost:5000/api/food/${editing.id}`, editing)
      .then(() => {
        toast.success("Food updated! 🐾");
        setEditing(null);
        fetchFood();
      }).catch(() => toast.error("Error updating food!"));
  };

  return (
    <div className="p-4 font-sans text-center bg-pink-50 min-h-screen">

      <Header />
      <Hero />
      <Features />
      <About />

      <section className="my-8 bg-white p-4 rounded-xl shadow-md w-[400px] mx-auto">

        <h2 className="text-2xl mb-4 text-pink-500 font-bold">🐾 Food List</h2>

        <input
          className="p-2 border rounded w-full mb-2"
          placeholder="Food Name"
          value={editing ? editing.name : newFood.name}
          onChange={e => editing ? setEditing({ ...editing, name: e.target.value }) : setNewFood({ ...newFood, name: e.target.value })}
        />
        <input
          className="p-2 border rounded w-full mb-2"
          placeholder="Price"
          value={editing ? editing.price : newFood.price}
          onChange={e => editing ? setEditing({ ...editing, price: e.target.value }) : setNewFood({ ...newFood, price: e.target.value })}
        />

        {editing ? (
          <button className="bg-yellow-400 hover:bg-yellow-500 rounded p-2 w-full" onClick={updateFood}>Update</button>
        ) : (
          <button className="bg-pink-400 hover:bg-pink-500 text-white rounded p-2 w-full" onClick={addFood}>Add</button>
        )}

        <ul className="mt-4 space-y-2">
          {foods.map(food => (
            <li key={food.id} className="flex justify-between items-center bg-pink-100 p-2 rounded shadow">
              <span>{food.name} - ₹{food.price}</span>
              <div className="space-x-2">
                <button className="bg-green-400 hover:bg-green-500 rounded px-2" onClick={() => setEditing(food)}>Edit</button>
                <button className="bg-red-400 hover:bg-red-500 rounded px-2" onClick={() => deleteFood(food.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Testimonials />
      <Blog />
      <Newsletter />
      <Footer />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
