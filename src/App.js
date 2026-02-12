import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import RewardsDashboard from "./components/RewardsDashboard";
import "./styles/app.css";

/**
 * Root App component
 * Wraps the application with ErrorBoundary for error handling
 * 
 * @returns {JSX.Element} App component
 */
const App = () => {
  return (
    <ErrorBoundary>
      <RewardsDashboard />
    </ErrorBoundary>
  );
};

export default App;
