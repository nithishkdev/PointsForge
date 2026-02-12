/**
 * Utility functions for date manipulation and formatting
 */

/**
 * Generates a unique key for month-year combination
 * 
 * @param {string} date - ISO date string
 * @returns {string} Month-year key in format "YYYY-M"
 */
export const getMonthYearKey = (date) => {
  const dateObject = new Date(date);
  return `${dateObject.getFullYear()}-${dateObject.getMonth()}`;
};

/**
 * Extracts month and year labels from a date
 * 
 * @param {string} date - ISO date string
 * @returns {Object} Object containing month name and year
 * @returns {string} returns.monthYear - Combined "Month Year" format
 * @returns {number} returns.year - Full year
 */
export const getMonthYearLabel = (date) => {
  const dateObject = new Date(date);
  const month = dateObject.toLocaleString("default", { month: "long" });
  const year = dateObject.getFullYear();
  
  return {
    monthYear: `${month} ${year}`,
    year: year
  };
};
