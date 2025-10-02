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
  const [cache, setCache] = useState<Record<string, Result[]>>({});

  // cache data
  // const DUMMY_CACHE = {
  //   iphone: [
  //     {
  //       id: 101,
  //       title: "Apple AirPods Max Silver",
  //     },
  //     {
  //       id: 104,
  //       title: "Apple iPhone Charger",
  //     },
  //   ],
  //   food: [
  //     {
  //       id: 18,
  //       title: "Cat Food",
  //     },
  //     {
  //       id: 22,
  //       title: "Dog Food",
  //     },
  //   ],
  // };
  // Check if input is in cache. if yes give results from cache otherwise fetchdata

  const fetchData = async (input: string) => {
    try {
      if (input in cache) {
        setResults(cache[input]);
        console.log("CACHE", input);
        return;
      }

      console.log("API CALL", input);

      const response = await fetch(
        `https://dummyjson.com/products/search?q=${input}`
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setResults(data?.products);
      setCache((prev) => {
        return { ...prev, [input]: data?.products };
      });
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(input);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
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
          {showResults &&
            results.map((r) => {
              return <span key={r.id}>{r.title}</span>;
            })}
        </div>
      </div>
    </div>
  );
};

export default AutoCompleteSearch;
