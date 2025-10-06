import { useContext } from 'react';
import './CartSidebar.css';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';

type CartSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartSideBar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { state, dispatch } = useContext(ShoppingCartContext);

  console.log('state', state);

  if (!isOpen) {
    return null;
  }
  return (
    <>
      {/* Overlay */}
      <div
        className={`overlay ${isOpen ? 'show' : ''}`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={onClose}>
            ❌
          </button>
        </div>
        <div className="cart-items">
          {state.items.map((item: any) => {
            return (
              <div className="cart-item" key={item.id}>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.price}</p>
                </div>
                <div className="cart-controls">
                  <button>-</button>
                  <input type="text" value={item.qty} readOnly />
                  <button>+</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="cart-summary">Cart Summary</div>
      </div>
    </>
  );
};

export default CartSideBar;
