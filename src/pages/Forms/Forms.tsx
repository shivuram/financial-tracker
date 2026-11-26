import { useState, type FormEvent } from "react";
import "../../styles/form.css";

type ListItem = {
  id: number;
  name: string;
  email: string;
};

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [listData, setListData] = useState<ListItem[]>([
    {
      id: 1,
      name: "Shiva",
      email: "shiva@gmail.com",
    },
    {
      id: 2,
      name: "Ramu",
      email: "ramu@gmail.com",
    },
  ]);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (editingId) {
      // Update the existing entry
      console.log(listData);
      setListData(
        listData.map((item) =>
          item.id === editingId
            ? { ...item, name: name.trim(), email: email.trim() }
            : item,
        ),
      );
      setEditingId(null);
    } else {
      // Add a new entry
      setListData([
        ...listData,
        {
          id: Date.now(),
          name: name.trim(),
          email: email.trim(),
        },
      ]);
    }

    // Clear the input fields once submitted
    setName("");
    setEmail("");
    setError("");
  };

  const editHandler = (list: ListItem) => {
    setName(list.name);
    setEmail(list.email);
    setEditingId(list.id);
  };

  const deleteHandler = (list: ListItem) => {
    setListData((prev) => prev.filter((item) => item.id !== list.id));

    if (editingId === list.id) {
      setEditingId(null);
      setName("");
      setEmail("");
      setError("");
    }
  };

  return (
    <div className="form-container">
      <h2>Form Page</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text"
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text"
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">
          {editingId !== null ? "Update" : "Submit"}
        </button>

        <div className="list">
          {listData.map((list) => (
            <div className="list-card" key={list.id}>
              <div className="list-details">
                <p className="list-name">{list.name}</p>
                <p className="list-email">{list.email}</p>
              </div>
              <div className="card-actions">
                <button
                  className="edit-button"
                  type="button"
                  onClick={() => editHandler(list)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  type="button"
                  onClick={() => deleteHandler(list)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Form;
