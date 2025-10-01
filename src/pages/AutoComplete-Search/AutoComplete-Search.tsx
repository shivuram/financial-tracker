import { useEffect, useState } from "react";
import "../../styles/autocomplete.css";

type Result = {
  id: number;
  title: string;
};

const AutoCompleteSearch = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [showResults, setShowResults] = useState(false);
  const fetchData = async (input: string) => {
    console.log("fetch data", input);
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${input}`
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setResults(data?.products);
      console.log("results", results);
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    fetchData(input);
  }, [input]);

  return (
    <div className="autocomplete-container">
      <h3>AutoComplete Search Bar</h3>
      <div className="search-container">
        <div>
          <input
            type="text"
            name="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setShowResults(true)}
            onBlur={() => setShowResults(false)}
          />
        </div>

        <div className="results-container">
          {showResults && results.length > 0 ? (
            results.map((r) => {
              return <span key={r.id}>{r.title}</span>;
            })
          ) : (
            <span>No Results Found</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoCompleteSearch;
