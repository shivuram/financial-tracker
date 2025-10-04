import './CartSidebar.css';

type CartSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartSideBar = ({ isOpen, onClose }: CartSidebarProps) => {
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
        <div className="cart-items">Cart Items</div>
        <div className="cart-summary">Cart Summary</div>
      </div>
    </>
  );
};

export default CartSideBar;
