import React from "react";

/**
 * Loading spinner component
 * @returns {JSX.Element}
 */
const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner" />
      <p>Loading rewards data...</p>
    </div>
  );
};

export default Loader;
