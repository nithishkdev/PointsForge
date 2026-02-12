import React from "react";
import useRewardsData from "../hooks/useRewardsData";
import TransactionsTable from "./TransactionsTable";
import MonthlyRewardsTable from "./MonthlyRewardsTable";
import TotalRewardsTable from "./TotalRewardsTable";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const RewardsDashboard = () => {
  const {
    transactions,
    monthlyRewards,
    totalRewards,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    clearFilters
  } = useRewardsData();

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container">
      <h1>Customer Rewards Dashboard</h1>

      {/* Global Filter */}

      <div className="section">
        <div className="filters">
          <input
            type="text"
            placeholder="Search customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <input
            type="date"
            value={
              startDate
                ? new Date(startDate).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              setStartDate(
                e.target.value ? new Date(e.target.value) : null
              )
            }
          />

          <input
            type="date"
            value={
              endDate
                ? new Date(endDate).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              setEndDate(
                e.target.value ? new Date(e.target.value) : null
              )
            }
          />

          <button
            onClick={clearFilters}
            className="clear-filters-btn"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* TRANSACTIONS */}

      <div className="section">
        <h2>Transactions</h2>

        <div className="table-wrapper">
          <TransactionsTable data={transactions} />
        </div>
      </div>

      {/* Monthly Rewards*/}

      <div className="section">
        <h2>Monthly Rewards</h2>

        <div className="table-wrapper">
          <MonthlyRewardsTable data={monthlyRewards} />
        </div>
      </div>

      {/* Total Rewards */}

      <div className="section">
        <h2>Total Rewards</h2>

        <div className="table-wrapper">
          <TotalRewardsTable data={totalRewards} />
        </div>
      </div>
    </div>
  );
};

export default RewardsDashboard;
