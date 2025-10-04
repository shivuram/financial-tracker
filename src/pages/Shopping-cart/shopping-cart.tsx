import { useEffect, useState } from 'react';
import '../../styles/shopping-cart.css';
import CartSideBar from '../../components/ShoppingCart/CartSideBar';

type Products = {
  id: number;
  thumbnail: string;
  title: string;
  category: string;
  price: number;
  stock: number;
};

const ShoppingCart = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products data');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="shopping-cart">
      <h2>Mini E-Commerce Application</h2>

      <header style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
        <button onClick={() => setIsCartOpen(true)}>🛒 View Cart</button>
      </header>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-list-item">
            <div>
              <img src={product.thumbnail} alt="" />
            </div>
            <div>{product.title}</div>
            <div>{product.category}</div>
            <div>${product.price}</div>
            <button
              className={`cart-button ${product.stock < 10 ? 'disabled' : ''}`}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <CartSideBar isOpen={isCartOpen} onClose={handleCloseCart} />
    </div>
  );
};

export default ShoppingCart;
