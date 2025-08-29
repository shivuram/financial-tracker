import { useMemo, useState } from "react";
import type { TransactionData, TransactionType } from "../../types/transaction";
import TransactionForm from "../../components/Transactions/TransactionForm";
import TransactionList from "../../components/Transactions/TransactionList";
import TransactionFilters from "../../components/Transactions/TransactionFilters";

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
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

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

    // filter by type
    if (filterType) {
      data = data.filter((tx) => {
        return tx.type === filterType;
      });
    }

    // search by title
    if (search.trim()) {
      data = data.filter((tx) => {
        return tx.title.toLowerCase().includes(search.toLowerCase());
      });
    }

    // Sort by amount
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
  }, [transactionsData, filterType, sortOrder, search]);

  return (
    <>
      <div className="tracker-container">
        <div className="header-container">
          <div className="balance">
            <h3>Balance: ₹{balance}</h3>
          </div>

          <button
            className="toggle-form-button"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Transaction Form" : "Open Transaction Form"}
          </button>
        </div>

        {showForm && (
          <TransactionForm
            title={title}
            setTitle={setTitle}
            amount={amount}
            setAmount={setAmount}
            type={type}
            setType={setType}
            addTransactions={addTransactions}
            isEdit={isEdit}
          />
        )}

        <div className="error">{errorMsg && errorMsg}</div>

        <div className="summary">
          <div>Income: ₹{income}</div>
          <div>Expense: ₹{expense}</div>
        </div>

        <TransactionFilters
          filterType={filterType}
          setFilterType={setFilterType}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          setSearch={setSearch}
        />

        <TransactionList
          transactions={filteredAndSortedTransactions}
          editTransactions={editTransactions}
          deleteTransactions={deleteTransactions}
        />
      </div>
    </>
  );
};

export default Transactions;
