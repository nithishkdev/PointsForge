import {
  getRecentThreeMonthsData,
  aggregateMonthlyRewards,
  aggregateTotalRewards
} from "../utils/aggregationUtils";

describe("Aggregation Utils - Comprehensive Testing", () => {

  describe("getRecentThreeMonthsData", () => {
    const mockTransactions = [
      { id: "tx1", date: "2025-01-15", customerId: "C001", amount: 10000 },
      { id: "tx2", date: "2025-01-20", customerId: "C002", amount: 12000 },
      { id: "tx3", date: "2024-12-10", customerId: "C001", amount: 15000 },
      { id: "tx4", date: "2024-12-25", customerId: "C003", amount: 8000 },
      { id: "tx5", date: "2024-11-05", customerId: "C002", amount: 20000 },
      { id: "tx6", date: "2024-11-18", customerId: "C001", amount: 9500 },
      { id: "tx7", date: "2024-10-22", customerId: "C003", amount: 11000 }
    ];

    test("returns only the most recent three months of transactions", () => {
      const result = getRecentThreeMonthsData(mockTransactions);
      
      expect(result.filteredTransactions).toHaveLength(6);
      expect(result.filteredTransactions.some(t => t.id === "tx7")).toBe(false);
    });

    test("returns correct date range", () => {
      const result = getRecentThreeMonthsData(mockTransactions);
      
      expect(result.startDate).toBe("2024-11-05");
      expect(result.endDate).toBe("2025-01-20");
    });

    test("handles empty array", () => {
      const result = getRecentThreeMonthsData([]);
      
      expect(result.filteredTransactions).toEqual([]);
      expect(result.startDate).toBe("");
      expect(result.endDate).toBe("");
    });

    test("handles transactions from single month", () => {
      const singleMonth = [
        { id: "tx1", date: "2025-01-15", amount: 10000 },
        { id: "tx2", date: "2025-01-20", amount: 12000 }
      ];
      
      const result = getRecentThreeMonthsData(singleMonth);
      
      expect(result.filteredTransactions).toHaveLength(2);
      expect(result.startDate).toBe("2025-01-15");
      expect(result.endDate).toBe("2025-01-20");
    });
  });

  describe("aggregateMonthlyRewards", () => {
    const mockTransactions = [
      {
        customerId: "C001",
        customerName: "John Doe",
        date: "2025-01-15",
        rewardPoints: 50
      },
      {
        customerId: "C001",
        customerName: "John Doe",
        date: "2025-01-20",
        rewardPoints: 90
      },
      {
        customerId: "C002",
        customerName: "Jane Smith",
        date: "2025-01-10",
        rewardPoints: 150
      },
      {
        customerId: "C001",
        customerName: "John Doe",
        date: "2024-12-05",
        rewardPoints: 25
      }
    ];

    test("aggregates points by customer and month", () => {
      const result = aggregateMonthlyRewards(mockTransactions);
      
      expect(result).toHaveLength(3);
    });

    test("correctly sums points for same customer in same month", () => {
      const result = aggregateMonthlyRewards(mockTransactions);
      
      const johnJan = result.find(r => 
        r.customerName === "John Doe" && r.monthYear === "January 2025"
      );
      
      expect(johnJan.points).toBe(140); // 50 + 90
    });

    test("creates separate entries for same customer in different months", () => {
      const result = aggregateMonthlyRewards(mockTransactions);
      
      const johnEntries = result.filter(r => r.customerName === "John Doe");
      
      expect(johnEntries).toHaveLength(2);
    });

    test("handles empty array", () => {
      const result = aggregateMonthlyRewards([]);
      
      expect(result).toEqual([]);
    });
  });

  describe("aggregateTotalRewards", () => {
    const mockMonthlyRewards = [
      { customerName: "John Doe", monthYear: "January 2025", points: 140 },
      { customerName: "John Doe", monthYear: "December 2024", points: 25 },
      { customerName: "Jane Smith", monthYear: "January 2025", points: 150 },
      { customerName: "Bob Johnson", monthYear: "January 2025", points: 90 }
    ];

    test("aggregates total points per customer", () => {
      const result = aggregateTotalRewards(mockMonthlyRewards);
      
      expect(result).toHaveLength(3);
    });

    test("correctly sums points for customers across multiple months", () => {
      const result = aggregateTotalRewards(mockMonthlyRewards);
      
      const johnTotal = result.find(r => r.customerName === "John Doe");
      
      expect(johnTotal.points).toBe(165); // 140 + 25
    });

    test("maintains separate entries for different customers", () => {
      const result = aggregateTotalRewards(mockMonthlyRewards);
      
      const customerNames = result.map(r => r.customerName);
      
      expect(customerNames).toContain("John Doe");
      expect(customerNames).toContain("Jane Smith");
      expect(customerNames).toContain("Bob Johnson");
    });

    test("handles empty array", () => {
      const result = aggregateTotalRewards([]);
      
      expect(result).toEqual([]);
    });
  });
});
