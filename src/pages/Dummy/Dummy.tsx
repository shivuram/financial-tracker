import React, { useState, useMemo, useCallback } from "react";

// A memoized child component that only re-renders if its props change
const ChildComponent = React.memo(({ onClick }) => {
  console.log("Child re-rendered!");
  return <button onClick={onClick}>Click Me (Child)</button>;
});

const Dummy = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  console.log("RENDERING...");

  // 1. useMemo: Memoizes the RESULT of a calculation
  // Without useMemo, this slow loop runs every time you type in the input!
  const expensiveValue = useMemo(() => {
    console.log("Running expensive calculation...");
    let result = 0;
    for (let i = 0; i < 10000000; i++) result += i;
    return result + count;
  }, [count]); // Only re-runs if 'count' changes

  // 2. useCallback: Memoizes the FUNCTION itself
  // Without useCallback, this function is "new" on every render,
  // causing the ChildComponent to re-render even if text hasn't changed.
  const handleChildClick = useCallback(() => {
    console.log("Child button clicked");
  }, []); // Stable reference; never changes

  return (
    <div>
      <h2>
        Count: {count} | Expensive Value: {expensiveValue}
      </h2>
      <button onClick={() => setCount((c) => c + 1)}>Increment Count</button>

      <hr />

      <input
        placeholder="Type here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>
        Typing here won't trigger the "expensive" loop or re-render the Child.
      </p>

      <ChildComponent onClick={handleChildClick} />
    </div>
  );
};

export default Dummy;
