
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9f9f9' 
    }}>
      <div className="text-center">
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: 'var(--primary-color)'
        }}>
          404
        </h1>
        <p style={{ 
          fontSize: '1.5rem',
          color: '#666',
          marginBottom: '1rem'
        }}>
          Oops! Page not found
        </p>
        <a 
          href="/" 
          className="btn btn-primary"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
