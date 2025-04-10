
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./contexts/ProductContext.js";
import Dashboard from "./pages/Dashboard.js";
import Products from "./pages/Products.js";
import NotFound from "./pages/NotFound.js";

const App = () => (
  
  <ProductProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ProductProvider>
);

export default App;
