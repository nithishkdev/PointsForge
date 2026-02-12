import React from "react";
import { logger } from "../utils/logger";

/**
 * Error Boundary component to catch JavaScript errors anywhere in the component tree
 * Logs error information and displays a fallback UI
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  /**
   * Updates state when an error is caught
   * @param {Error} error - The error that was thrown
   * @returns {Object} New state object
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * Logs error details when an error is caught
   * @param {Error} error 
   * @param {Object} errorInfo
   */
  componentDidCatch(error, errorInfo) {
    logger.error("Error caught by ErrorBoundary", {
      error: error.toString(),
      errorInfo: errorInfo.componentStack
    });

    this.setState({
      error,
      errorInfo
    });
  }

  /**
   * Resets error state
   */
  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <h1>Oops! Something went wrong</h1>
            <p>We apologize for the inconvenience. The application has encountered an unexpected error.</p>
            
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="error-details">
                <summary>Error Details (Development Mode)</summary>
                <pre>{this.state.error.toString()}</pre>
                <pre>{this.state.errorInfo?.componentStack}</pre>
              </details>
            )}
            
            <div className="error-boundary-actions">
              <button onClick={this.handleReset} className="retry-btn">
                Try Again
              </button>
              <button onClick={() => window.location.reload()} className="reload-btn">
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
