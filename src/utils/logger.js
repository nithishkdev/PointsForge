/**
 * Centralized logging utility for the application
 * Automatically disabled in production environments
 */

const isDevelopment = process.env.NODE_ENV !== "production";

/**
 * Formats log messages with timestamp and metadata
 * 
 * @param {string} level - Log level (INFO, WARN, ERROR, DEBUG)
 * @param {string} message - Log message
 * @param {Object} metadata - Additional metadata to log
 * @returns {Object} Formatted log object
 */
const formatMessage = (level, message, metadata) => {
  const timestamp = new Date().toISOString();

  return {
    timestamp,
    level,
    message,
    ...(metadata && { metadata })
  };
};

/**
 * Logger object with methods for different log levels
 */
export const logger = {
  /**
   * Log informational messages
   * @param {string} message - Message to log
   * @param {Object} metadata - Optional metadata
   */
  info(message, metadata = null) {
    if (!isDevelopment) {
      return;
    }
    // eslint-disable-next-line no-console
    console.info(formatMessage("INFO", message, metadata));
  },

  /**
   * Log warning messages
   * @param {string} message - Message to log
   * @param {Object} metadata - Optional metadata
   */
  warn(message, metadata = null) {
    if (!isDevelopment) {
      return;
    }
    // eslint-disable-next-line no-console
    console.warn(formatMessage("WARN", message, metadata));
  },

  /**
   * Log error messages
   * @param {string} message - Message to log
   * @param {Object} metadata - Optional metadata
   */
  error(message, metadata = null) {
    if (!isDevelopment) {
      return;
    }
    // eslint-disable-next-line no-console
    console.error(formatMessage("ERROR", message, metadata));
  },

  /**
   * Log debug messages
   * @param {string} message - Message to log
   * @param {Object} metadata - Optional metadata
   */
  debug(message, metadata = null) {
    if (!isDevelopment) {
      return;
    }
    // eslint-disable-next-line no-console
    console.debug(formatMessage("DEBUG", message, metadata));
  }
};
