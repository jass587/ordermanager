import { createAsyncThunk } from "@reduxjs/toolkit";
import CartService from "../../services/api/cart";
import {
  setCart,
  setCartLoading,
  setCartError,
  clearCart,
} from "../store/cartSlice";

// ✅ Load cart from backend (supports .unwrap)
export const fetchCartFromBackend = createAsyncThunk(
  "cart/fetchCartFromBackend",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setCartLoading(true));

      const res = await CartService.getCart();

      const cartItems = res.data.result.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        productInfo: item.Product,
      }));

      thunkAPI.dispatch(setCart(cartItems));

      return cartItems;
    } catch (err) {
      console.error("Error fetching cart:", err);
      thunkAPI.dispatch(setCartError(err.message || "Failed to load cart"));
      return thunkAPI.rejectWithValue(err.message);
    } finally {
      thunkAPI.dispatch(setCartLoading(false));
    }
  }
);

// ✅ Sync cart to backend (accepts merged cart manually)
export const syncCartToBackend = createAsyncThunk(
  "cart/syncCartToBackend",
  async (cartItems, thunkAPI) => {
    try {
      const payload = cartItems.map(({ productId, quantity }) => ({ productId, quantity }));
      await CartService.checkoutCart(payload);
    } catch (err) {
      thunkAPI.dispatch(setCartError(err.message || "Checkout failed"));
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
