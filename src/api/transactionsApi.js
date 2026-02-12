import { logger } from "../utils/logger";

/**
 * Fetches transaction data from the API endpoint
 *
 * @returns {Promise<Array>} Promise resolving
 * @throws {Error} If the API request fails
 */
export const fetchTransactions = async () => {
  logger.info("Fetching transactions from API");

  const response = await fetch("/transactions.json");

  if (!response.ok) {
    logger.error("API request failed", { status: response.status });
    throw new Error("Unable to fetch transactions");
  }

  logger.info("Transactions fetched successfully");
  return response.json();
};

// export const fetchTransactions = async () => {
//   await new Promise((resolve) => setTimeout(resolve, 1200));

//   throw new Error("Network Error: Failed to fetch transactions");
// };
