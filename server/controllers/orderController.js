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
                { model: OrderItem, include: [Product] },
                Payment,
                User,
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
