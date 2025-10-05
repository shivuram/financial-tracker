import { ShoppingCartProvider } from './../../contexts/ShoppingCartContext';
import ShoppingCart from './shopping-cart';

const ShoppingCartLayout = () => {
  return (
    <ShoppingCartProvider>
      <ShoppingCart />
    </ShoppingCartProvider>
  );
};

export default ShoppingCartLayout;
