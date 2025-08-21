import type { TransactionData } from "../../types/transaction";

interface Props {
  transactions: TransactionData[];
  editTransactions: (val: TransactionData) => void;
  deleteTransactions: (val: TransactionData) => void;
}

const TransactionList = ({
  transactions,
  editTransactions,
  deleteTransactions,
}: Props) => {
  const noTransactionsData = "No transactions found";

  if (transactions.length === 0) {
    return <p className="no-transactions">{noTransactionsData}</p>;
  }

  return (
    <>
      {transactions.map((item) => (
        <div key={item.id} className="transactions">
          <ul>
            <li className={item.type === "expense" ? "expense" : "income"}>
              {item.title} ₹{item.amount}
              <button className="edit" onClick={() => editTransactions(item)}>
                Edit
              </button>
              <button
                className="delete"
                onClick={() => deleteTransactions(item)}
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default TransactionList;
