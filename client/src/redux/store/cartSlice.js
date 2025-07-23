import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],        // [{ productId, quantity, productInfo }]
  loading: false,   // For async actions like fetchCartFromBackend
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Replace cart entirely (used on backend load or guest cart restore)
    setCart: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Add new item or increase quantity
    addItem: (state, action) => {
      const existing = state.items.find(
        item => item.productId === action.payload.productId
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    // Update quantity of existing item
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;

      state.items = state.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      );
    },

    // Remove item completely
    removeItem: (state, action) => {
      state.items = state.items.filter(
        i => i.productId !== action.payload
      );
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
    },

    // Set loading flag
    setCartLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set error message
    setCartError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setCart,
  addItem,
  updateQuantity,
  removeItem,
  clearCart,
  setCartLoading,
  setCartError,
} = cartSlice.actions;

export default cartSlice.reducer;
