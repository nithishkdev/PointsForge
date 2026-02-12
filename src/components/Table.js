import React, { useMemo, useState, useEffect } from "react";

/**
 * Reusable Table Component
 *
 * Features:
 * Sorting
 * Pagination
 * Memoized data
 * Page reset on sort/filter
 * Handles numbers, strings & dates
 *
 * @param {Array} data
 * @param {Array} columns
 * @param {string} emptyMessage
 * @param {number} defaultPageSize
 */
const Table = ({
  data = [],
  columns = [],
  emptyMessage = "No data available",
  defaultPageSize = 5
}) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  /**
   * Reset page whenever data changes (filter/search)
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  /**
   * Handle column sorting
   */
  const handleSort = (key) => {
    setCurrentPage(1); // ⭐ critical fix

    if (sortKey === key) {
      setSortDirection((prev) =>
        prev === "asc" ? "desc" : "asc"
      );
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  /**
   * SORT FIRST — Always before pagination
   */
  const sortedData = useMemo(() => {
    if (!sortKey) {
      return data;
    }

    return [...data].sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];

      // Handle dates
      if (sortKey === "date" || aVal instanceof Date) {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      // Handle numbers
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc"
          ? aVal - bVal
          : bVal - aVal;
      }

      // Default string compare
      return sortDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [data, sortKey, sortDirection]);

  /**
   * THEN paginate
   */
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  /**
   * Empty State
   */
  if (!data.length) {
    return <div className="empty">{emptyMessage}</div>;
  }

  return (
    <>
      {/* Page Size */}
      <div className="table-controls">
        <select
          className="page-size-selector"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1); // reset
          }}
        >
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={col.sortable ? "sortable" : ""}
                  onClick={() =>
                    col.sortable && handleSort(col.key)
                  }
                >
                  {col.label}

                  {sortKey === col.key && (
                    <span>
                      {sortDirection === "asc" ? " ↑" : " ↓"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={row.transactionId || index}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={col.className || ""}
                  >
                    {col.render
                      ? col.render(row)
                      : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((prev) => prev - 1)
          }
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => prev + 1)
          }
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Table;
