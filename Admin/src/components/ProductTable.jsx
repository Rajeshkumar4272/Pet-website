
import React, { useState } from 'react';
import { useProducts } from '../contexts/ProductContext.js';
import ProductForm from './ProductForm.js';
import DeleteProduct from './DeleteProduct.js';

const ProductTable = () => {
  const { products, searchProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  
  const filteredProducts = searchQuery ? searchProducts(searchQuery) : products;
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  const handleEdit = (product) => {
    setEditingProduct(product);
  };
  
  const handleDelete = (product) => {
    setDeletingProduct(product);
  };
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="search-container">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setIsAddModalOpen(true)}
        >
          <i className="fas fa-plus"></i>
          Add Product
        </button>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <h3 className="empty-state-title">No products found</h3>
          <p className="empty-state-description">
            {searchQuery 
              ? "Try adjusting your search query" 
              : "Get started by adding a new product"}
          </p>
          {!searchQuery && (
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="btn btn-outline mt-4"
            >
              <i className="fas fa-plus"></i>
              Add Product
            </button>
          )}
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="font-weight-bold">{product.name}</td>
                  <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {product.description}
                  </td>
                  <td>{formatPrice(product.price)}</td>
                  <td>
                    <span className={`stock-indicator ${
                      product.stock < 10 
                        ? 'stock-low' 
                        : product.stock < 30 
                        ? 'stock-medium' 
                        : 'stock-high'
                    }`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="text-right table-actions">
                    <button 
                      className="btn btn-outline btn-icon"
                      onClick={() => handleEdit(product)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="btn btn-outline btn-icon"
                      style={{ color: 'var(--danger-color)' }}
                      onClick={() => handleDelete(product)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Add/Edit Product Form Modal */}
      {(isAddModalOpen || editingProduct) && (
        <ProductForm
          product={editingProduct}
          isOpen={isAddModalOpen || !!editingProduct}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingProduct(null);
          }}
        />
      )}
      
      {/* Delete Confirmation */}
      {deletingProduct && (
        <DeleteProduct
          product={deletingProduct}
          isOpen={!!deletingProduct}
          onClose={() => setDeletingProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductTable;
