import React from "react";
import Table from "./Table";

/**
 * Monthly rewards table component
 * Displays reward points aggregated by customer and month
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of monthly reward objects
 * @returns {JSX.Element} MonthlyRewardsTable component
 */
const MonthlyRewardsTable = ({ data }) => {
  const columns = [
    {
      key: "customerName",
      label: "Customer",
      sortable: true
    },
    {
      key: "monthKey",
      label: "Month & Year",
      sortable: true
    },
    {
      key: "points",
      label: "Points",
      sortable: true,
      className: "points"
    }
  ];

  return (
    <Table
      data={data}
      columns={columns}
      emptyMessage="No monthly rewards data available"
      defaultPageSize={5}
    />
  );
};

export default MonthlyRewardsTable;
