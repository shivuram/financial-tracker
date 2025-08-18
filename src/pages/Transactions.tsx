import { useMemo, useState } from "react";
import type { TransactionData, TransactionType } from "../types/transaction";

const Transactions = () => {
  const [transactionsData, setTransactions] = useState<TransactionData[]>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  // const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<TransactionType>("expense");

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

  const { income, expense, balance } = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactionsData.forEach((item) => {
      if (item.type === "income") {
        income = income + item.amount;
      } else {
        expense = expense + item.amount;
      }
    });

    return {
      income,
      expense,
      balance: income - expense,
    };
    // If you’re using useMemo, Then this is an object, not a function.
    // Notice we don’t call calcIncomeExpenseBalance(). Because useMemo already executes and returns the object.
  }, [transactionsData]);

  return (
    <>
      <div className="tracker-container">
        <div className="header-container">
          <div className="balance">
            <h3>Balance: ₹{balance}</h3>
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
          <div>Income: ₹{income}</div>
          <div>Expense: ₹{expense}</div>
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
