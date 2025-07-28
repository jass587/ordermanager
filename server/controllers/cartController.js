const { CartItem, Product } = require('../models');

// GET /api/cart
exports.getCartItems = async (req, res) => {
  try {
    const items = await CartItem.findAll({
      where: { userId: req.user.id },
      include: [{ model: Product }],
    });
    res.json({
      message: "Cart items fetched successfully",
      status: true,
      result: items,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch cart items",
      status: false,
      result: null,
    });
  }
};

// POST /api/cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const existing = await CartItem.findOne({
      where: { userId: req.user.id, productId },
    });

    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      return res.json({
        message: "Cart item quantity updated",
        status: true,
        result: existing,
      });
    }

    const newItem = await CartItem.create({
      userId: req.user.id,
      productId,
      quantity,
    });

    res.status(201).json({
      message: "Cart item added successfully",
      status: true,
      result: newItem,
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to add item to cart - ${err.message}`,
      status: false,
      result: null,
    });
  }
};

// POST api/cart/checkout
exports.checkoutCart = async (req, res) => {
  const userId = req.user.id;
  const items = req.body.items; // Expected: [{ productId, quantity }]

  if (!Array.isArray(items)) {
    return res.status(400).json({
      message: "Cart items are required",
      status: false,
      result: null,
    });
  }

  try {
    // 1. Remove existing cart items for this user
    await CartItem.destroy({ where: { userId } });

    // 2. Create new cart items
    const newCartItems = await Promise.all(
      items.map(item => {
        if (!item.productId || !item.quantity) {
          throw new Error("Invalid cart item format");
        }
        return CartItem.create({
          userId,
          productId: item.productId,
          quantity: item.quantity,
        });
      })
    );

    // 3. Include product info in response
    const result = await CartItem.findAll({
      where: { userId },
      include: [{ model: Product }],
    });

    return res.json({
      message: "Cart synced successfully at checkout",
      status: true,
      result,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Checkout failed",
      status: false,
      result: null,
    });
  }
};

// PUT /api/cart/:id
exports.updateCartItem = async (req, res) => {
  try {
    const item = await CartItem.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!item) {
      return res.status(404).json({
        message: "Cart item not found",
        status: false,
        result: null,
      });
    }

    item.quantity = req.body.quantity;
    await item.save();

    res.json({
      message: "Cart item updated successfully",
      status: true,
      result: item,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update cart item",
      status: false,
      result: null,
    });
  }
};

// DELETE /api/cart/:id
exports.deleteCartItem = async (req, res) => {
  try {
    const item = await CartItem.destroy({
      where: { id: req.params.id, userId: req.user.id },
    });

    res.json({
      message: "Cart item deleted successfully",
      status: true,
      result: item,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete cart item",
      status: false,
      result: null,
    });
  }
};
