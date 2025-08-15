import { createContext, useContext, useMemo, useReducer } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext();

const types = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  CLEAR: 'CLEAR'
};

function cartReducer(state, action) {
  switch (action.type) {
    case types.ADD: {
      const { producto, cantidad } = action.payload;
      const existente = state.items.find(i => i.producto._id === producto._id);
      let items;
      if (existente) {
        items = state.items.map(i =>
          i.producto._id === producto._id ? { ...i, cantidad: i.cantidad + cantidad } : i
        );
      } else {
        items = [...state.items, { producto, cantidad, precioUnitario: producto.precio }];
      }
      const total = items.reduce((acc, it) => acc + it.cantidad * it.precioUnitario, 0);
      return { items, total };
    }
    case types.REMOVE: {
      const id = action.payload;
      const items = state.items.filter(i => i.producto._id !== id);
      const total = items.reduce((acc, it) => acc + it.cantidad * it.precioUnitario, 0);
      return { items, total };
    }
    case types.CLEAR:
      return { items: [], total: 0 };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [persisted, setPersisted] = useLocalStorage('carrito', { items: [], total: 0 });
  const [state, dispatch] = useReducer(cartReducer, persisted);

  // Sincroniza con localStorage
  useMemo(() => {
    setPersisted(state);
  }, [state, setPersisted]);

  const addToCart = (producto, cantidad = 1) => dispatch({ type: types.ADD, payload: { producto, cantidad } });
  const removeFromCart = (productoId) => dispatch({ type: types.REMOVE, payload: productoId });
  const clearCart = () => dispatch({ type: types.CLEAR });

  const value = { ...state, addToCart, removeFromCart, clearCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
}
