const { Order, OrderItem, Payment, Product, User } = require("../models");

// POST /api/orders
exports.createOrder = async (req, res) => {
  const { totalAmount, items } = req.body;
  const userId = req.user.id;
  try {
    const order = await Order.create({ userId, totalAmount, status: "completed" });

    const orderItems = items.map(item => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    await OrderItem.bulkCreate(orderItems);

    res.status(201).json({
      message: "Order created successfully",
      status: true,
      result: { orderId: order.id },
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create order",
      status: false,
      result: null,
      error: err.message,
    });
  }
};

// GET /api/orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: OrderItem, include: [Product] },
        Payment,
        User,
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({
      message: "All orders fetched successfully",
      status: true,
      result: orders,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch orders",
      status: false,
      result: null,
      error: err.message,
    });
  }
};

// GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ["id", "title"], // Only include needed product fields
            },
          ],
        },
        {
          model: Payment,
        },
        {
          model: User,
          attributes: ["id", "name"], // Only include needed user fields
        },
      ],
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        status: false,
        result: null,
      });
    }

    res.json({
      message: "Order fetched successfully",
      status: true,
      result: order,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch order",
      status: false,
      result: null,
      error: err.message,
    });
  }
};

//GET user specific all orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Payment,
        },
        {
          model: OrderItem,
          include: [{ model: Product, attributes: ["title"] }],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.json({
      msg: "Orders fetched successfully",
      status: true,
      result: orders,
    });
  } catch (err) {
    console.error("Error fetching orders:", err);
    return res.status(500).json({
      msg: "Something went wrong",
      status: false,
      result: [],
    });
  }
};

//GET user specific all orders by orderid
exports.getUserOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [
        {
          model: Payment,
        },
        {
          model: OrderItem,
          include: [{ model: Product, attributes: ["title"] }],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({
        msg: "Order not found",
        status: false,
        result: null,
      });
    }

    return res.json({
      msg: "Order fetched successfully",
      status: true,
      result: order,
    });
  } catch (err) {
    console.error("Error fetching order:", err);
    return res.status(500).json({
      msg: "Something went wrong",
      status: false,
      result: null,
    });
  }
};


