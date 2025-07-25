const { Payment } = require("../models");

// POST /api/payments
exports.createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body); // status: 'pending' or passed
    res.status(201).json({
      message: "Payment created successfully",
      status: true,
      result: payment,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create payment",
      status: false,
      result: null,
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
    const payments = await Payment.findAll({ where });
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

// GET /api/payments/:id (only succeeded if not admin)
exports.getPaymentById = async (req, res) => {
  try {
    const isAdmin = req.query.admin === "true";

    const payment = await Payment.findOne({
      where: {
        id: req.params.id,
        ...(isAdmin ? {} : { status: "succeeded" }),
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
