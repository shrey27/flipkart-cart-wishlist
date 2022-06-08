import { createContext, useContext, useReducer } from "react";
const CartContext = createContext();

const initialState = {
  cart: [],
  wishlist: [],
  total: 0,
  price: 0,
};

function reducerFunction(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
        price: state.price + action.payload.price,
        total: state.total + action.payload.price + 100,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
        price: state.price - action.payload.price * action.payload.quantity,
        total:
          state.total - action.payload.price * action.payload.quantity + 100,
      };
    case "UPDATE_CART_INC":
      const productToUpdate = action.payload;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === productToUpdate.id ? { ...productToUpdate } : { ...item }
        ),
        price: state.price + productToUpdate.price,
        total: state.total + productToUpdate.price,
      };
    case "UPDATE_CART_DEC":
      const productToUpdate2 = action.payload;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === productToUpdate2.id ? { ...productToUpdate2 } : { ...item }
        ),
        price: state.price - productToUpdate2.price,
        total: state.total - productToUpdate2.price,
      };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
      };
    default:
      return { ...state };
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
