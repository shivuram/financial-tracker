import { useState } from "react";
import type { TransactionData, TransactionType } from "../types/transaction";

const Transactions = () => {
  const [transactionsData, setTransactions] = useState<TransactionData[]>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  // const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<"income" | "expense">("expense");

  const addTransactions = () => {
    const newTx: TransactionData = {
      id: Math.random(),
      title,
      amount: Number(amount), // ensure number
      type, // valid union
    };

    setTransactions([...transactionsData, newTx]);
    setTitle("");
    setAmount("");
    // setTransactions((prev) => [...prev, newTx]);
  };

  const noTransactionsData = "No transactions found";

  return (
    <>
      <div className="tracker-container">
        <div className="header-container">
          <div className="balance">
            <h3>Balance: ₹0</h3>
          </div>

          <button className="toggle-form-button">Add Transaction</button>
        </div>
        <div className="form">
          <label>Enter Title</label>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Enter Amount</label>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label>Select Transaction Type</label>
          <select onChange={(e) => setType(e.target.value as TransactionType)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {/* <label>Select Date of Transaction</label>
          <input id="date" type="date" className="input-date" /> */}
          <button onClick={addTransactions}>Submit</button>
        </div>

        <div className="summary">
          <div>Income: ₹0</div>
          <div>Expense: ₹0</div>
        </div>

        {transactionsData.length > 0 ? (
          transactionsData.map((item) => (
            <div key={item.id} className="transactions">
              <ul>
                <li className={item.type === "expense" ? "expense" : "income"}>
                  {item.title} {item.amount}
                </li>
              </ul>
            </div>
          ))
        ) : (
          <p className="no-transactions">{noTransactionsData}</p>
        )}

        <input type="text" placeholder="Search..." className="search" />
      </div>
    </>
  );
};

export default Transactions;
