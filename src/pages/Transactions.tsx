import { useMemo, useState } from "react";
import type { TransactionData, TransactionType } from "../types/transaction";

const mockData: TransactionData[] = [
  {
    id: 1,
    title: "Food",
    amount: 5000,
    type: "expense",
  },
  {
    id: 2,
    title: "Vegetables",
    amount: 2000,
    type: "expense",
  },
  {
    id: 3,
    title: "Fruits",
    amount: 1000,
    type: "expense",
  },
  {
    id: 4,
    title: "Salary",
    amount: 40000,
    type: "income",
  },
];

const Transactions = () => {
  const [transactionsData, setTransactions] =
    useState<TransactionData[]>(mockData);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [type, setType] = useState<TransactionType>("expense");
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const addTransactions = () => {
    if (amount === null) return; // block invalid transaction

    // Amount must be positive number
    if (amount < 0) {
      setErrorMsg("Amount Should be a positive number");
      return;
    }

    if (title.length === 0) {
      setErrorMsg("Title should not be empty");
      return;
    }

    if (!isEdit) {
      // ➕ Add new transaction
      const newTx: TransactionData = {
        id: Math.random(),
        title,
        amount: amount, // ensure number
        type, // valid union
      };

      setTransactions([...transactionsData, newTx]);
      setTitle("");
      setAmount(null);
      // setTransactions((prev) => [...prev, newTx]);
    } else {
      // 🔄 Update existing transaction
      const updatedTransactions = transactionsData.map((tx) => {
        if (tx.id === editingId) {
          return { ...tx, title, amount, type };
        }
        return tx;
      });
      setTransactions(updatedTransactions);
      setIsEdit(false);
      setEditingId(null);
      setTitle("");
      setAmount(null);
    }
  };

  const deleteTransactions = (item: TransactionData) => {
    const updatedTransactions = transactionsData.filter((val) => {
      return val.id !== item.id;
    });

    setTransactions(updatedTransactions);
  };

  const editTransactions = (item: TransactionData) => {
    setTitle(item.title);
    setAmount(item.amount);
    setType(item.type);
    setEditingId(item.id); // mark as editing
    setIsEdit(true);
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

  const filteredAndSortedTransactions = useMemo(() => {
    let data = [...transactionsData];

    // filter
    if (filterType) {
      data = data.filter((tx) => {
        return tx.type === filterType;
      });
    }

    // Sort
    if (sortOrder === "high") {
      data.sort((a, b) => {
        return b.amount - a.amount;
      });
    } else if (sortOrder === "low") {
      data.sort((a, b) => {
        return a.amount - b.amount;
      });
    }

    return data;
  }, [transactionsData, filterType, sortOrder]);

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
          {/* <label>Select Date of Transaction</label>
          <input id="date" type="date" className="input-date" /> */}
          <button onClick={addTransactions}>
            {!isEdit ? "Submit" : "Update"}
          </button>
        </div>
        <div className="error">{errorMsg && errorMsg}</div>

        <div className="summary">
          <div>Income: ₹{income}</div>
          <div>Expense: ₹{expense}</div>
        </div>

        <div className="filtering">
          <label>Filter By</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <label>Sort By</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">None</option>
            <option value="high">Amount (High → Low)</option>
            <option value="low">Amount (Low → High)</option>
          </select>
        </div>

        {filteredAndSortedTransactions.length > 0 ? (
          filteredAndSortedTransactions.map((item) => (
            <div key={item.id} className="transactions">
              <ul>
                <li className={item.type === "expense" ? "expense" : "income"}>
                  {item.title} ₹{item.amount}
                  <button
                    className="edit"
                    onClick={() => editTransactions(item)}
                  >
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
