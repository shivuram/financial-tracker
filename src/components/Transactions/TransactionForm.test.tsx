import { render, screen, fireEvent } from "@testing-library/react";
import TransactionForm from "./TransactionForm";

test("submits form with title, amount and type", () => {
  const mockAdd = jest.fn();
  const mockSetTitle = jest.fn();
  const mockSetAmount = jest.fn();
  const mockSetType = jest.fn();

  render(
    <TransactionForm
      title="Test"
      setTitle={mockSetTitle}
      amount={100}
      setAmount={mockSetAmount}
      type="income"
      setType={mockSetType}
      addTransactions={mockAdd}
      isEdit={false}
    />
  );

  fireEvent.click(screen.getByText(/Submit/i));
  expect(mockAdd).toHaveBeenCalledTimes(1);
});

test("test toggle based on isEdit state", () => {
  const mockAdd = jest.fn();
  const mockSetTitle = jest.fn();
  const mockSetAmount = jest.fn();
  const mockSetType = jest.fn();

  render(
    <TransactionForm
      title="Test"
      setTitle={mockSetTitle}
      amount={100}
      setAmount={mockSetAmount}
      type="income"
      setType={mockSetType}
      addTransactions={mockAdd}
      isEdit={true}
    />
  );

  fireEvent.click(screen.getByText(/Update/i));
  expect(mockAdd).toHaveBeenCalledTimes(1);
});
