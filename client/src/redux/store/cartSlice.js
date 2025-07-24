import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],        
  loading: false,   
  error: null,
  isCartLoaded: false,  
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // ✅ Replace cart entirely (used when loading from backend)
    setCart: (state, action) => {
      console.log("🔄 setCart called with:", action.payload);
      console.trace("setCart called from:");
      state.items = action.payload;
      state.loading = false;
      state.error = null;
      state.isCartLoaded = true;  
    },

    // ✅ Add new item or increase quantity
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

    // ✅ Update quantity of existing item
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      state.items = state.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      );
    },

    // ✅ Remove item completely
    removeItem: (state, action) => {
      state.items = state.items.filter(
        item => item.productId !== action.payload
      );
    },

    // ✅ Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.isCartLoaded = false; // Optional: reset flag on clear
    },

    // ✅ Set loading flag
    setCartLoading: (state, action) => {
      state.loading = action.payload;
    },

    // ✅ Set error message
    setCartError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // ✅ Manually set isCartLoaded (for edge cases)
    setCartLoaded: (state, action) => {
      state.isCartLoaded = action.payload;
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
  setCartLoaded,
} = cartSlice.actions;

export default cartSlice.reducer;
