import React from 'react';
import './LoadingPopup.css'; // Add CSS for styling the loading popup

const LoadingPopup = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-popup">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingPopup;
