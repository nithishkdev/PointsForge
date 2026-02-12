import React from "react";
import Table from "./Table";

/**
 * Total rewards table component
 * Displays total reward points per customer
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of total reward objects
 * @returns {JSX.Element} TotalRewardsTable component
 */
const TotalRewardsTable = ({ data }) => {
  /**
   * Column configuration for the table
   */
  const columns = [
    {
      key: "customerName",
      label: "Customer",
      sortable: true
    },
    {
      key: "points",
      label: "Total Points",
      sortable: true,
      className: "points"
    }
  ];

  return (
    <Table
      data={data}
      columns={columns}
      emptyMessage="No total rewards data available"
      defaultPageSize={5}
    />
  );
};

export default TotalRewardsTable;
