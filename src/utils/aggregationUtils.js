import { getMonthYearKey, getMonthYearLabel } from "./dateUtils";

/**
 * Filters transactions to get only the most recent three months of data
 * 
 * @param {Array} transactions - Array of transaction objects
 * @returns {Object} Object containing filtered transactions and date range
 * @returns {Array} returns.filteredTransactions - Transactions from last 3 months
 * @returns {string} returns.startDate - Start date of the range (YYYY-MM-DD)
 * @returns {string} returns.endDate - End date of the range (YYYY-MM-DD)
 */
export const getRecentThreeMonthsData = (transactions) => {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const uniqueMonthKeys = [];

  for (const transaction of sortedTransactions) {
    const monthKey = getMonthYearKey(transaction.date);
    if (!uniqueMonthKeys.includes(monthKey)) {
      uniqueMonthKeys.push(monthKey);
    }
    if (uniqueMonthKeys.length === 3) {
      break;
    }
  }

  const filteredTransactions = sortedTransactions.filter((transaction) =>
    uniqueMonthKeys.includes(getMonthYearKey(transaction.date))
  );

  // Calculate date range
  let startDate = "";
  let endDate = "";
  
  if (filteredTransactions.length > 0) {
    const sortedByDate = [...filteredTransactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    startDate = sortedByDate[0].date;
    endDate = sortedByDate[sortedByDate.length - 1].date;
  }

  return {
    filteredTransactions,
    startDate,
    endDate
  };
};

/**
 * Aggregates transactions by customer and month to calculate monthly rewards
 *
 * @param {Array} transactions - Array of transaction objects with rewardPoints
 * @returns {Array} Array of monthly reward summaries per customer
 */
export const aggregateMonthlyRewards = (transactions) =>
  Object.values(
    transactions.reduce((accumulator, transaction) => {
      const monthKey = getMonthYearKey(transaction.date); // YYYY-MM

      const uniqueKey = `${transaction.customerId}-${monthKey}`;

      if (!accumulator[uniqueKey]) {
        accumulator[uniqueKey] = {
          customerId: transaction.customerId,
          customerName: transaction.customerName,
          monthKey, // raw key only
          points: 0
        };
      }

      accumulator[uniqueKey].points += Number(transaction.rewardPoints) || 0;

      return accumulator;
    }, {})
  );


/**
 * Aggregates monthly rewards to calculate total rewards per customer
 * 
 * @param {Array} monthlyRewardsData - Array of monthly reward objects
 * @returns {Array} Array of total reward summaries per customer
 */
export const aggregateTotalRewards = (monthlyRewardsData) =>
  Object.values(
    monthlyRewardsData.reduce((accumulator, row) => {
      if (!accumulator[row.customerName]) {
        accumulator[row.customerName] = {
          customerName: row.customerName,
          points: 0
        };
      }
      accumulator[row.customerName].points += row.points;
      return accumulator;
    }, {})
  );
