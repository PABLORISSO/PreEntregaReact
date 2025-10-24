import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const CartContext = createContext(null);

// ---- Utils
const normId = (id) => String(id ?? "");
const toNumber = (v, def = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : def;
};

// ---- Estado inicial
const initialState = { cart: [] }; // [{ id, name, price, quantity, image }]

// ---- Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case "HYDRATE": {
      return action.payload ?? state;
    }
    case "ADD_ITEM": {
      const { product, qty = 1 } = action.payload;
      const id = normId(product.id);
      const price = toNumber(product.price, 0);
      const existing = state.cart.find((p) => normId(p.id) === id);

      if (existing) {
        return {
          ...state,
          cart: state.cart.map((p) =>
            normId(p.id) === id ? { ...p, quantity: p.quantity + qty } : p
          ),
        };
      }
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            id,
            name: product.name ?? "",
            price,
            image: product.image ?? product.imageUrl ?? "",
            quantity: toNumber(qty, 1),
          },
        ],
      };
    }
    case "REMOVE_ONE": {
      const id = normId(action.payload.id);
      return {
        ...state,
        cart: state.cart
          .map((p) =>
            normId(p.id) === id ? { ...p, quantity: p.quantity - 1 } : p
          )
          .filter((p) => p.quantity > 0),
      };
    }
    case "SET_QTY": {
      const { id, qty } = action.payload;
      const q = Math.max(0, toNumber(qty, 0));
      if (q === 0) {
        return {
          ...state,
          cart: state.cart.filter((p) => normId(p.id) !== normId(id)),
        };
      }
      return {
        ...state,
        cart: state.cart.map((p) =>
          normId(p.id) === normId(id) ? { ...p, quantity: q } : p
        ),
      };
    }
    case "REMOVE_ITEM": {
      const id = normId(action.payload.id);
      return {
        ...state,
        cart: state.cart.filter((p) => normId(p.id) !== id),
      };
    }
    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Hidratar desde localStorage (una vez)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.cart)) {
          dispatch({ type: "HYDRATE", payload: parsed });
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Persistir
  useEffect(() => {
    try {
      localStorage.setItem("cart_v1", JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  // Selectores memorizados
  const totalItems = useMemo(
    () => state.cart.reduce((acc, p) => acc + toNumber(p.quantity, 0), 0),
    [state.cart]
  );
  const totalPrice = useMemo(
    () =>
      state.cart.reduce(
        (acc, p) => acc + toNumber(p.price, 0) * toNumber(p.quantity, 0),
        0
      ),
    [state.cart]
  );
  const hasItem = (id) => state.cart.some((p) => normId(p.id) === normId(id));

  // API
  const addItem = (product, qty = 1) =>
    dispatch({ type: "ADD_ITEM", payload: { product, qty: toNumber(qty, 1) } });
  const removeOne = (id) => dispatch({ type: "REMOVE_ONE", payload: { id } });
  const setQty = (id, qty) => dispatch({ type: "SET_QTY", payload: { id, qty } });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const value = {
    cart: state.cart,
    totalItems,
    totalPrice,
    hasItem,
    addItem,
    removeOne,
    setQty,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
};
