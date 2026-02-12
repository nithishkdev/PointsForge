import { getMonthYearKey, getMonthYearLabel } from "../utils/dateUtils";

describe("Date Utils - Comprehensive Testing", () => {

  describe("getMonthYearKey", () => {
    test("generates correct key for various dates", () => {
      expect(getMonthYearKey("2025-01-15")).toBe("2025-0");
      expect(getMonthYearKey("2024-12-31")).toBe("2024-11");
      expect(getMonthYearKey("2023-06-10")).toBe("2023-5");
    });

    test("handles same month different days", () => {
      expect(getMonthYearKey("2025-01-01")).toBe("2025-0");
      expect(getMonthYearKey("2025-01-15")).toBe("2025-0");
      expect(getMonthYearKey("2025-01-31")).toBe("2025-0");
    });

    test("handles different months same year", () => {
      expect(getMonthYearKey("2025-01-15")).toBe("2025-0");
      expect(getMonthYearKey("2025-02-15")).toBe("2025-1");
      expect(getMonthYearKey("2025-12-15")).toBe("2025-11");
    });
  });

  describe("getMonthYearLabel", () => {
    test("returns correct monthYear format for various dates", () => {
      expect(getMonthYearLabel("2025-01-15").monthYear).toBe("January 2025");
      expect(getMonthYearLabel("2024-12-31").monthYear).toBe("December 2024");
      expect(getMonthYearLabel("2023-06-10").monthYear).toBe("June 2023");
    });

    test("returns correct year value", () => {
      expect(getMonthYearLabel("2025-01-15").year).toBe(2025);
      expect(getMonthYearLabel("2024-12-31").year).toBe(2024);
      expect(getMonthYearLabel("2023-06-10").year).toBe(2023);
    });

    test("handles all months correctly", () => {
      const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
      ];

      months.forEach((month, index) => {
        const monthNum = String(index + 1).padStart(2, "0");
        const date = `2025-${monthNum}-15`;
        const result = getMonthYearLabel(date);
        
        expect(result.monthYear).toBe(`${month} 2025`);
      });
    });
  });
});
