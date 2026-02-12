/**
 * Calculates reward points based on transaction amount.
 *
 * Reward Rules:
 * - $0–$50   → 0 points
 * - $51–$100 → 1 point per dollar over $50
 * - > $100   → 2 points per dollar over $100 + 50 points
 *
 *
 * Amount is stored and processed in CENTS to avoid floating-point precision issues.
 */

const FIFTY_DOLLARS_IN_CENTS = 5000;
const HUNDRED_DOLLARS_IN_CENTS = 10000;

export const calculateRewardPoints = (amountInCents) => {
  if (!Number.isFinite(amountInCents) || amountInCents < 0) {
    return 0;
  }

  // Below $50 → no rewards
  if (amountInCents <= FIFTY_DOLLARS_IN_CENTS) {
    return 0;
  }

  // Between $50 and $100
  if (amountInCents <= HUNDRED_DOLLARS_IN_CENTS) {
    return Math.floor(
      (amountInCents - FIFTY_DOLLARS_IN_CENTS) / 100
    );
  }

  // Above $100
  return (
    50 +
    Math.floor(
      (amountInCents - HUNDRED_DOLLARS_IN_CENTS) / 100
    ) * 2
  );
};
