import React from "react";

/**
 * Error message component
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @param {Function} props.onRetry - Callback function for retry action
 * @returns {JSX.Element} ErrorMessage component
 */
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error">
      <p>{message}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
};

export default ErrorMessage;
