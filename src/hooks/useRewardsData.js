import { useEffect, useMemo, useState } from "react";
import { fetchTransactions } from "../api/transactionsApi";
import {
  aggregateMonthlyRewards,
  aggregateTotalRewards,
  getRecentThreeMonthsData
} from "../utils/aggregationUtils";
import { calculateRewardPoints } from "../utils/rewardCalculator";

const useRewardsData = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Global filters
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // ⭐ Store default date range for reset
  const [defaultStartDate, setDefaultStartDate] = useState(null);
  const [defaultEndDate, setDefaultEndDate] = useState(null);

  /**
   * Fetch + Enrich + Apply Default 3 Months
   */
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();

        // Enrich transactions with reward points
        const enrichedTransactions = data.map((tx) => ({
          ...tx,
          transactionId: tx.id,
          rewardPoints: Number(calculateRewardPoints(tx.amount)) || 0
        }));

        //  Get latest 3 months
        const {
          filteredTransactions,
          startDate: recentStart,
          endDate: recentEnd
        } = getRecentThreeMonthsData(enrichedTransactions);

        setTransactions(filteredTransactions);

        const start = recentStart ? new Date(recentStart) : null;
        const end = recentEnd ? new Date(recentEnd) : null;

        setStartDate(start);
        setEndDate(end);

        // Store defaults for reset
        setDefaultStartDate(start);
        setDefaultEndDate(end);
      } catch (err) {
        setError(err.message || "Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  /**
   * Global Filtering
   */
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        !searchTerm ||
        tx.customerName?.toLowerCase().includes(searchTerm.toLowerCase());

      const txDate = new Date(tx.date);

      const matchesDate =
        (!startDate || txDate >= startDate) && (!endDate || txDate <= endDate);

      return matchesSearch && matchesDate;
    });
  }, [transactions, searchTerm, startDate, endDate]);

  /**
   * Derived Aggregations
   */
  const monthlyRewards = useMemo(() => {
    return aggregateMonthlyRewards(filteredTransactions);
  }, [filteredTransactions]);

  const totalRewards = useMemo(() => {
    return aggregateTotalRewards(monthlyRewards);
  }, [monthlyRewards]);

  /**
   * Reset Filters → Back to Latest 3 Months
   */
  const clearFilters = () => {
    setSearchTerm("");
    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
  };

  return {
    transactions: filteredTransactions,
    monthlyRewards,
    totalRewards,
    loading,
    error,

    // Filters
    searchTerm,
    setSearchTerm,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    clearFilters
  };
};

export default useRewardsData;
