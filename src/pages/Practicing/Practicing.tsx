import { useState } from "react";

const Practicing = () => {
  const [tags, setTags] = useState(["react", "hooks", "state"]);
  const [todos, setTodos] = useState([
    { id: 1, title: "Write docs", done: false },
    { id: 2, title: "Review PR", done: false },
    { id: 3, title: "Write UT", done: false },
  ]);

  // Add an item
  const addHandler = (newTag) => {
    // setTags([...tags, newTag]);
    setTags((prev) => [...prev, newTag]);
  };

  // Update an item by value or index
  const editHandler = (oldTag, updatedTag) => {
    setTags((prev) =>
      prev.map((tag) => {
        return tag == oldTag ? updatedTag : tag;
      }),
    );
  };

  // Remove an item
  const removeHandler = (targetTag) => {
    setTags((prev) =>
      prev.filter((tag) => {
        return tag != targetTag;
      }),
    );
  };

  // Add a new object
  const addTodo = () => {
    const newTodo = {
      id: 4,
      title: "newTodoItem",
      done: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  // Toggle a property on one object immutably
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) => {
        return todo.id === id ? { ...todo, done: !todo.done } : todo;
      }),
    );
  };

  // Remove an object by id
  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <div>
      <h2>Array of Strings</h2>
      <button onClick={() => addHandler("Redux")}>Add</button>
      <button onClick={() => editHandler("react", "newReact")}>Edit</button>
      <button onClick={() => removeHandler("hooks")}>Delete</button>
      {tags.map((tag) => (
        <div key={Math.random()}>{tag}</div>
      ))}
      <h2>Array of Objects</h2>
      <button onClick={() => addTodo()}>Add</button>
      <button onClick={() => toggleTodo(2)}>Toggle</button>
      <button onClick={() => deleteTodo(2)}>Delete</button>
      {todos.map((todo) => (
        <div key={Math.random()}>
          <p>{todo.title}</p>
          <p>{todo.done}</p>
        </div>
      ))}
    </div>
  );
};

export default Practicing;
