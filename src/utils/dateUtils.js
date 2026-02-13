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


/**
 * Formats month-year key into UI friendly format
 * Example: "2025-02" → "2025-FEB"
 *
 * @param {string} monthKey - Format: YYYY-MM
 * @returns {string} Formatted label
 */
export const formatMonthYearLabel = (monthKey) => {
  if (!monthKey) return "";

  const [year, month] = monthKey.split("-");

  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];

  const monthIndex = parseInt(month, 10) - 1;

  return `${year}-${monthNames[monthIndex]}`;
};