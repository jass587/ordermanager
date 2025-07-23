import axiosInstance from './axiosInstance';

const CartService = {
  // GET: Fetch all cart items
  getCart: () => axiosInstance.get('/cart'),

  // POST: Sync cart items on checkout
  checkoutCart: (items) =>
    axiosInstance.post('/cart/checkout', { items }),

  updateCartItem: (id, quantity) =>
    axiosInstance.put(`/cart/${id}`, { quantity }),

  deleteCartItem: (id) =>
    axiosInstance.delete(`/cart/${id}`),
};

export default CartService;
