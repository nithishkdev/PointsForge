import { calculateRewardPoints } from "../utils/rewardCalculator";

describe("Reward Calculator - Comprehensive Testing", () => {

  describe("Basic reward calculation rules", () => {
    test("returns 0 points for amounts at or below $50 (5000 cents)", () => {
      expect(calculateRewardPoints(0)).toBe(0);
      expect(calculateRewardPoints(1000)).toBe(0);  // $10
      expect(calculateRewardPoints(5000)).toBe(0);  // $50
    });

    test("returns correct points between $50 and $100 (5000-10000 cents)", () => {
      expect(calculateRewardPoints(5100)).toBe(1);   // $51 -> 1 point
      expect(calculateRewardPoints(7500)).toBe(25);  // $75 -> 25 points
      expect(calculateRewardPoints(9900)).toBe(49);  // $99 -> 49 points
      expect(calculateRewardPoints(10000)).toBe(50); // $100 -> 50 points
    });

    test("returns correct points above $100 (10000 cents)", () => {
      expect(calculateRewardPoints(12000)).toBe(90);   // $120 -> 90 points
      expect(calculateRewardPoints(15000)).toBe(150);  // $150 -> 150 points
      expect(calculateRewardPoints(20000)).toBe(250);  // $200 -> 250 points
    });
  });

  describe("Edge cases and boundary values", () => {
    test("floors decimal values correctly", () => {
      expect(calculateRewardPoints(10090)).toBe(50);  // $100.90 -> floors to $100
      expect(calculateRewardPoints(12070)).toBe(90);  // $120.70 -> floors to $120
      expect(calculateRewardPoints(7599)).toBe(25);   // $75.99 -> floors to $75
    });

    test("handles exact boundary values", () => {
      expect(calculateRewardPoints(5000)).toBe(0);   // Exactly $50
      expect(calculateRewardPoints(5001)).toBe(0);   // $50.01 floors to $50
      expect(calculateRewardPoints(10000)).toBe(50); // Exactly $100
      expect(calculateRewardPoints(10001)).toBe(50); // $100.01 floors to $100
    });
  });

  describe("Invalid input handling with isNaN checks", () => {
    test("returns 0 for negative values", () => {
      expect(calculateRewardPoints(-10)).toBe(0);
      expect(calculateRewardPoints(-1000)).toBe(0);
    });

    test("returns 0 for null input", () => {
      expect(calculateRewardPoints(null)).toBe(0);
    });

    test("returns 0 for undefined input", () => {
      expect(calculateRewardPoints(undefined)).toBe(0);
    });

    test("returns 0 for string inputs", () => {
      expect(calculateRewardPoints("100")).toBe(0);
      expect(calculateRewardPoints("abc")).toBe(0);
    });

    test("returns 0 for NaN input", () => {
      expect(calculateRewardPoints(NaN)).toBe(0);
    });

    test("returns 0 for boolean inputs", () => {
      expect(calculateRewardPoints(true)).toBe(0);
      expect(calculateRewardPoints(false)).toBe(0);
    });

    test("returns 0 for object inputs", () => {
      expect(calculateRewardPoints({})).toBe(0);
      expect(calculateRewardPoints({ amount: 100 })).toBe(0);
    });

    test("returns 0 for array inputs", () => {
      expect(calculateRewardPoints([])).toBe(0);
      expect(calculateRewardPoints([100])).toBe(0);
    });
  });

  describe("Large transaction values", () => {
    test("handles very large transaction values correctly", () => {
      expect(calculateRewardPoints(100000)).toBe(1850);   // $1000
      expect(calculateRewardPoints(1000000)).toBe(19850); // $10000
    });
  });

  describe("Real-world scenarios", () => {
    test("calculates points for typical retail transactions", () => {
      expect(calculateRewardPoints(3500)).toBe(0);    // $35 shoes
      expect(calculateRewardPoints(6500)).toBe(15);   // $65 shirt
      expect(calculateRewardPoints(9500)).toBe(45);   // $95 bag
      expect(calculateRewardPoints(12000)).toBe(90);  // $120 jacket
      expect(calculateRewardPoints(85000)).toBe(1550); // $850 laptop
    });
  });
});
