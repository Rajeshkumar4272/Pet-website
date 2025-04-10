
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

// Create context
const ProductContext = createContext();

// Initial product data
const initialProducts = [
  { id: 1, name: 'Premium Dog Food', description: 'High-quality nutrition for your dog', price: 29.99, stock: 50 },
  { id: 2, name: 'Cat Toys Bundle', description: 'Set of 5 interactive cat toys', price: 14.99, stock: 35 },
  { id: 3, name: 'Pet Carrier', description: 'Comfortable travel carrier for small pets', price: 39.99, stock: 20 },
  { id: 4, name: 'Grooming Brush', description: 'Professional-grade brush for all pet types', price: 12.99, stock: 45 },
];

export const ProductProvider = ({ children }) => {
  // Load products from localStorage or use initial data
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('ainopets-products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });
  
  // Stats calculation
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStock: 0,
  });

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('ainopets-products', JSON.stringify(products));
    
    // Update stats
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
    const lowStock = products.filter(product => product.stock < 10).length;
    
    setStats({ totalProducts, totalValue, lowStock });
  }, [products]);

  // Add a new product
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
    };
    setProducts([...products, newProduct]);
    toast.success('Product added successfully');
  };

  // Update an existing product
  const updateProduct = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    toast.success('Product updated successfully');
  };

  // Delete a product
  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    toast.success('Product deleted successfully');
  };

  // Search products
  const searchProducts = (query) => {
    if (!query) return products;
    
    const lowerCaseQuery = query.toLowerCase();
    return products.filter(
      product => 
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery)
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        stats,
        addProduct,
        updateProduct,
        deleteProduct,
        searchProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the product context
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
