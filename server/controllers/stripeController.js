const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({
      message: "Amount is required.",
      status: "error",
      result: null,
    });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // in cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    return res.status(200).json({
      message: "Payment intent created successfully.",
      status: "success",
      result: {
        clientSecret: paymentIntent.client_secret,
      },
    });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    return res.status(500).json({
      message: "Failed to create payment intent.",
      status: "error",
      result: { error: error.message },
    });
  }
};
