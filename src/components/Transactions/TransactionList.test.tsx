import { render, screen, fireEvent } from "@testing-library/react";
import TransactionList from "./TransactionList";
import { TransactionData } from "../../types/transaction";

const mockTransactions: TransactionData[] = [
  { id: 1, title: "Salary", amount: 1000, type: "income" },
  { id: 2, title: "Groceries", amount: 200, type: "expense" },
];

describe("TransactionList", () => {
  it("renders transaction items", () => {
    const editTransactions = jest.fn();
    const deleteTransactions = jest.fn();
    render(
      <TransactionList
        transactions={mockTransactions}
        editTransactions={editTransactions}
        deleteTransactions={deleteTransactions}
      />
    );

    expect(screen.getByText(/Salary/i)).toBeInTheDocument();
    expect(screen.getByText(/Groceries/i)).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", () => {
    const editTransactions = jest.fn();
    const deleteTransactions = jest.fn();
    render(
      <TransactionList
        transactions={mockTransactions}
        editTransactions={editTransactions}
        deleteTransactions={deleteTransactions}
      />
    );

    fireEvent.click(screen.getAllByRole("button", { name: /delete/i })[0]);

    expect(deleteTransactions).toHaveBeenCalledWith({
      id: 1,
      title: "Salary",
      amount: 1000,
      type: "income",
    });
  });
});
