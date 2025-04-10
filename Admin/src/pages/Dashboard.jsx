
import React from 'react';
import AdminLayout from '../components/AdminLayout.js';
import DashboardOverview from '../components/DashboardOverview.js';

const Dashboard = () => {
  return (
    <AdminLayout activePage="Dashboard">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Overview of your product inventory</p>
        </div>
        <a href="/products" className="btn btn-primary">
          <i className="fas fa-box"></i>
          Manage Products
        </a>
      </div>
      
      <DashboardOverview />
      
      <div className="dashboard-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div className="card">
          <div className="card-content text-center">
            <img 
              src="https://placehold.co/300x150/e5deff/9b87f5?text=AinoPets+Analytics" 
              alt="Analytics Placeholder"
              style={{ maxWidth: '100%', borderRadius: 'var(--radius)' }}
            />
          </div>
        </div>
        <div className="card">
          <div className="card-content text-center">
            <img 
              src="https://placehold.co/300x150/d3e4fd/9b87f5?text=Recent+Sales" 
              alt="Recent Sales Placeholder"
              style={{ maxWidth: '100%', borderRadius: 'var(--radius)' }}
            />
          </div>
        </div>
        <div className="card">
          <div className="card-content text-center">
            <img 
              src="https://placehold.co/300x150/e5deff/9b87f5?text=Top+Products" 
              alt="Top Products Placeholder"
              style={{ maxWidth: '100%', borderRadius: 'var(--radius)' }}
            />
          </div>
        </div>
        <div className="card">
          <div className="card-content text-center">
            <img 
              src="https://placehold.co/300x150/d3e4fd/9b87f5?text=Inventory+Status" 
              alt="Inventory Status Placeholder"
              style={{ maxWidth: '100%', borderRadius: 'var(--radius)' }}
            />
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-content">
          <h3 className="mb-4">Welcome to AinoPets Admin Panel</h3>
          <p className="mb-4">
            This dashboard gives you an overview of your product inventory. 
            Manage your pet products, track stock levels, and monitor your 
            business performance all in one place.
          </p>
          <a href="/products" className="btn btn-outline">View All Products</a>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
