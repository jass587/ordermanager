const { OrderItem, Product, Order } = require("../models");

// GET /api/order-items
exports.getAllOrderItems = async (req, res) => {
  const where = {};
  if (req.query.orderId) where.orderId = req.query.orderId;
  if (req.query.productId) where.productId = req.query.productId;

  try {
    const items = await OrderItem.findAll({
      where,
      include: [Product, Order],
    });

    res.json({
      message: "Order items fetched successfully",
      status: true,
      result: items,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch order items",
      status: false,
      result: null,
      error: err.message,
    });
  }
};

// GET /api/order-items/:id
exports.getOrderItemById = async (req, res) => {
  try {
    const item = await OrderItem.findByPk(req.params.id, {
      include: [Product, Order],
    });

    if (!item) {
      return res.status(404).json({
        message: "Order item not found",
        status: false,
        result: null,
      });
    }

    res.json({
      message: "Order item fetched successfully",
      status: true,
      result: item,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch order item",
      status: false,
      result: null,
      error: err.message,
    });
  }
};
