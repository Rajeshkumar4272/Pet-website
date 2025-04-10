
import React, { useState } from 'react';
import { useProducts } from '../contexts/ProductContext.js';

const ProductForm = ({ product, isOpen, onClose }) => {
  const isEditing = !!product;
  const { addProduct, updateProduct } = useProducts();
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    stock: product?.stock || ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.stock) {
      newErrors.stock = 'Stock is required';
    } else if (isNaN(formData.stock) || Number(formData.stock) < 0 || !Number.isInteger(Number(formData.stock))) {
      newErrors.stock = 'Stock must be a non-negative integer';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    };
    
    if (isEditing) {
      updateProduct({
        ...productData,
        id: product.id
      });
    } else {
      addProduct(productData);
    }
    
    onClose();
  };

  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="text-danger" style={{ color: 'var(--danger-color)', fontSize: '14px', marginTop: '4px' }}>{errors.name}</div>}
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                rows="3"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && <div className="text-danger" style={{ color: 'var(--danger-color)', fontSize: '14px', marginTop: '4px' }}>{errors.description}</div>}
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="price">Price ($)</label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-input"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && <div className="text-danger" style={{ color: 'var(--danger-color)', fontSize: '14px', marginTop: '4px' }}>{errors.price}</div>}
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="stock">Stock</label>
              <input
                type="number"
                id="stock"
                name="stock"
                className="form-input"
                min="0"
                step="1"
                value={formData.stock}
                onChange={handleChange}
              />
              {errors.stock && <div className="text-danger" style={{ color: 'var(--danger-color)', fontSize: '14px', marginTop: '4px' }}>{errors.stock}</div>}
            </div>
          </form>
        </div>
        
        <div className="modal-footer">
          <button 
            className="btn btn-outline" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleSubmit}
          >
            {isEditing ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
