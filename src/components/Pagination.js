import React from "react";

/**
 * Pagination component for navigating through pages
 * 
 * @param {Object} props - Component props
 * @param {number} props.page - Current page number
 * @param {number} props.pageSize - Number of items per page
 * @param {number} props.total - Total number of items
 * @param {Function} props.onChange - Callback for page changes
 * @returns {JSX.Element|null} Pagination component or null if single page
 */
const Pagination = ({ page, pageSize, total, onChange }) => {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        Prev
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
