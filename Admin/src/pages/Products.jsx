
import React from 'react';
import AdminLayout from '../components/AdminLayout.js';
import ProductTable from '../components/ProductTable.js';

const Products = () => {
  return (
    <AdminLayout activePage="Products">
      <div className="page-header">
        <div>
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle">
            Manage your product inventory, add new products, and update existing ones.
          </p>
        </div>
      </div>
      
      <ProductTable />
    </AdminLayout>
  );
};

export default Products;
