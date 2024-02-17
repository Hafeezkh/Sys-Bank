import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingPage = ({ userId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      
      navigate(`/success/${userId}`);
    }, 2500); 

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [navigate, userId]);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', // Set a minimum height to cover the entire viewport
    padding: '20px', // Add some padding for better spacing
  };

  const spinnerStyle = {
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTop: '4px solid #3498db',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite', // Add rotation animation
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <h1>Loading...</h1>
      <div style={spinnerStyle}></div>

      {/* Keyframes for rotation animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingPage;
