import React from "react";
import Table from "./Table";

/**
 * Dumb Transactions Table
 * Receives already-filtered data from the global hook.
 */
const TransactionsTable = ({ data = [] }) => {
  const columns = [
    {
      key: "transactionId",
      label: "Transaction ID",
      sortable: true
    },
    {
      key: "customerName",
      label: "Customer",
      sortable: true
    },
    {
      key: "date",
      label: "Date",
      sortable: true
    },
    {
      key: "product",
      label: "Product",
      sortable: true
    },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
      className: "amount",
      render: (row) => `$${(row.amount / 100).toFixed(2)}`
    },
    {
      key: "rewardPoints",
      label: "Points",
      sortable: true,
      className: "points"
    }
  ];

  return (
    <Table
      data={data}
      columns={columns}
      emptyMessage="No transactions found"
      defaultPageSize={5}
    />
  );
};

export default TransactionsTable;
