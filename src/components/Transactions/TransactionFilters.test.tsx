import { render, screen, fireEvent } from "@testing-library/react";
import TransactionFilters from "./TransactionFilters";

describe("TransactionFilters", () => {
  it("calls onFilterChange when filter is selected", () => {
    const setFilterType = jest.fn();
    const setSortOrder = jest.fn();
    const setSearch = jest.fn();

    render(
      <TransactionFilters
        filterType="expense"
        setFilterType={setFilterType}
        sortOrder="high"
        setSortOrder={setSortOrder}
        setSearch={setSearch}
      />
    );

    fireEvent.change(screen.getByLabelText(/filter by/i), {
      target: { value: "income" },
    });

    expect(setFilterType).toHaveBeenCalledWith("income");
  });

  it("calls onSortChange when sort option is selected", () => {
    const setFilterType = jest.fn();
    const setSortOrder = jest.fn();
    const setSearch = jest.fn();

    render(
      <TransactionFilters
        filterType="expense"
        setFilterType={setFilterType}
        sortOrder="high"
        setSortOrder={setSortOrder}
        setSearch={setSearch}
      />
    );

    fireEvent.change(screen.getByLabelText(/sort by/i), {
      target: { value: "high" },
    });

    expect(setSortOrder).toHaveBeenCalledWith("high");
  });
});
