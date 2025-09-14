import { useEffect, useState, useMemo } from "react";
import "../../styles/pagination.css";

type Products = {
  title: string;
  thumbnail: string;
  price: number;
  id: number;
};

const ITEMS_PER_PAGE = 20;

const Pagination = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  // No of pages = total product / per page limit
  // Prev, Next
  // Looping through total no of pages

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/products?limit=100");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const paginatedProducts = useMemo(() => {
    const start = currentPage * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return products.slice(start, end);
  }, [products, currentPage]);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="app-container">
      <h2>Pagination</h2>
      <div className="pagination-container">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Prev
        </button>
        {[...Array(totalPages).keys()].map((page) => {
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
      >
        Next
      </button>
      <div className="product-container">
        {paginatedProducts.map((product) => {
          return (
            <div className="product-card" key={product.id}>
              <div>
                <img src={product.thumbnail} alt="" />
              </div>
              <div>{product.title}</div>
              <div>${`${product.price}`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;
