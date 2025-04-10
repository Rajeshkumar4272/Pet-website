
import React from 'react';
import { useProducts } from '../contexts/ProductContext.js';

const DashboardOverview = () => {
  const { stats, products } = useProducts();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const lowStockProducts = products.filter(product => product.stock < 10);

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-header">
          <div className="stat-title">Total Products</div>
          <i className="fas fa-box stat-icon"></i>
        </div>
        <div className="stat-value">{stats.totalProducts}</div>
        <div className="stat-description">Products in your inventory</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-header">
          <div className="stat-title">Inventory Value</div>
          <i className="fas fa-dollar-sign stat-icon"></i>
        </div>
        <div className="stat-value">{formatCurrency(stats.totalValue)}</div>
        <div className="stat-description">Total value of inventory</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-header">
          <div className="stat-title">Low Stock</div>
          <i className={`fas fa-exclamation-circle stat-icon ${stats.lowStock > 0 ? 'low-stock' : ''}`}></i>
        </div>
        <div className={`stat-value ${stats.lowStock > 0 ? 'low-stock' : ''}`}>{stats.lowStock}</div>
        <div className="stat-description">Products with less than 10 items</div>
      </div>
    </div>
  );
};

export default DashboardOverview;
