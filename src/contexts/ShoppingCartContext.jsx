import { createContext, useReducer } from 'react';

const ShoppingCartContext = createContext();

const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => {
          return item.id !== action.payload.id;
        }),
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
};

const ShoppingCartProvider = ({ children }) => {
  // const [count, setCount] = useState(0);
  // cart state - items[] -- id, name, price, category

  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <ShoppingCartContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export { ShoppingCartContext, ShoppingCartProvider };
