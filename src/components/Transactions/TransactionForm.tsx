import type { TransactionType } from "../../types/transaction";

interface Props {
  title: string;
  setTitle: (val: string) => void;
  amount: number | null;
  setAmount: (val: number | null) => void;
  type: TransactionType;
  setType: (val: TransactionType) => void;
  addTransactions: () => void;
  isEdit: boolean;
}

const TransactionForm = ({
  title,
  setTitle,
  amount,
  setAmount,
  setType,
  addTransactions,
  isEdit,
}: Props) => {
  return (
    <div className="form">
      <label htmlFor="title">Enter Title</label>
      <input
        id="title"
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="amount">Enter Amount</label>
      <input
        id="amount"
        type="number"
        placeholder="Amount"
        value={amount ?? ""} // if null → show empty string
        onChange={(e) =>
          setAmount(e.target.value ? Number(e.target.value) : null)
        }
      />
      <label>Select Transaction Type</label>
      <select onChange={(e) => setType(e.target.value as TransactionType)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <button onClick={addTransactions}>{!isEdit ? "Submit" : "Update"}</button>
    </div>
  );
};

export default TransactionForm;
