import CartService from '../../services/api/cart';
import {
  setCart,
  setCartLoading,
  setCartError,
  clearCart,
} from '../store/cartSlice';

// ✅ Load cart from backend
export const fetchCartFromBackend = () => async (dispatch) => {
  try {
    dispatch(setCartLoading(true));

    const res = await CartService.getCart();

    dispatch(setCart(
      res.data.result.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        productInfo: item.product,
      }))
    ));
  } catch (err) {
    dispatch(setCartError(err.message || 'Failed to load cart'));
  } finally {
    dispatch(setCartLoading(false));
  }
};

// Sync cart to backend on checkout
export const syncCartToBackend = () => async (dispatch, getState) => {
  const { cart } = getState();

  try {
    const items = cart.items.map(({ productId, quantity }) => ({ productId, quantity }));
    await CartService.checkoutCart(items);

    dispatch(clearCart());
  } catch (err) {
    dispatch(setCartError(err.message || 'Checkout failed'));
  }
};
