import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find(i => String(i.id) === String(item.id));
      if (existing) {
        existing.qty += item.qty;
      } else {
        state.items.push({ ...item });
      }
    },
    incrementQty(state, action) {
      const id = action.payload;
      const existing = state.items.find(i => String(i.id) === String(id));
      if (existing) {
        existing.qty += 1;
      }
    },
    decrementQty(state, action) {
      const id = action.payload;
      const existing = state.items.find(i => String(i.id) === String(id));
      if (existing) {
        existing.qty = Math.max(existing.qty - 1, 1);
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  }
});

export const { addToCart, incrementQty, decrementQty, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
