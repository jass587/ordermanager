const { Payment, Order, User } = require("../models");

// POST /api/payments
exports.createPayment = async (req, res) => {
    try {
        const { orderId, amount, method, status, transactionId } = req.body;

        const payment = await Payment.create({
            orderId: orderId || null, // Allow null
            amount,
            method,
            status,
            transactionId,
        });

        res.status(201).json({
            message: "Payment recorded",
            status: true,
            result: payment,
        });
    } catch (err) {
        res.status(500).json({
            message: "Payment failed to record",
            status: false,
            error: err.message,
        });
    }
};

// GET /api/payments (with optional ?status=succeeded)
exports.getAllPayments = async (req, res) => {
    const where = {};
    if (req.query.status) {
        where.status = req.query.status;
    }

    try {
        const payments = await Payment.findAll({
            where,
            include: [
                {
                    model: Order,
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'name'], // or 'username'
                        },
                    ],
                },
            ],
        });

        res.json({
            message: "Payments fetched successfully",
            status: true,
            result: payments,
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch payments",
            status: false,
            result: null,
            error: err.message,
        });
    }
};


// GET /api/payments/:id
exports.getPaymentById = async (req, res) => {
    try {
        const isAdmin = req.query.admin === "true";

        const payment = await Payment.findOne({
            where: {
                id: req.params.id
            },
        });

        if (!payment) {
            return res.status(404).json({
                message: "Payment not found or not successful",
                status: false,
                result: null,
            });
        }

        res.json({
            message: "Payment fetched successfully",
            status: true,
            result: payment,
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch payment",
            status: false,
            result: null,
            error: err.message,
        });
    }
};
