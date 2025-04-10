
import React from 'react';
import { useProducts } from '../contexts/ProductContext.js';

const DeleteProduct = ({ product, isOpen, onClose }) => {
  const { deleteProduct } = useProducts();

  const handleDelete = () => {
    deleteProduct(product.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Are you sure?</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <p>
            This will permanently delete "{product.name}" from your products. 
            This action cannot be undone.
          </p>
        </div>
        
        <div className="modal-footer">
          <button 
            className="btn btn-outline" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="btn btn-danger" 
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
