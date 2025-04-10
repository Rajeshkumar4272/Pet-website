
import React, { useState } from 'react';

export const AdminLayout = ({ children, activePage = 'Dashboard' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Navigation items
  const mainNav = [
    { name: 'Dashboard', href: '/', icon: 'fas fa-th-large' },
    { name: 'Products', href: '/products', icon: 'fas fa-box' },
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className={`sidebar ${!sidebarOpen ? 'collapsed' : ''}`}>
        {/* Logo */}
        <div className="sidebar-header">
          <div className="logo">
            <i className="fas fa-paw logo-icon"></i>
            <span className="logo-text">AinoPets</span>
          </div>
        </div>
        
        {/* Nav links */}
        <div className="sidebar-nav">
          {mainNav.map((item) => (
            <a 
              key={item.name}
              href={item.href}
              className={`nav-item ${activePage === item.name ? 'active' : ''}`}
            >
              <i className={item.icon}></i>
              <span>{item.name}</span>
            </a>
          ))}
        </div>
        
        {/* Sidebar toggle */}
        <div className="sidebar-footer">
          <button className="toggle-button" onClick={toggleSidebar}>
            <i className="fas fa-chevron-left"></i>
            <span>Collapse sidebar</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className={`main-content ${!sidebarOpen ? 'expanded' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
