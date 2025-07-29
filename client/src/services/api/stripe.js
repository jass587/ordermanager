import axiosInstance from "@services/api/axiosInstance";

const StripeService = {
  createPaymentIntent: async (data) => {
    try {
      const response = await axiosInstance.post("/stripe/create-payment-intent", data);
      if (response.data.status === "success") {
        return response.data.result.clientSecret;
      } else {
        throw new Error(response.data.message || "Failed to create payment intent.");
      }
    } catch (error) {
      console.error("StripeService Error:", error.message);
      throw error;
    }
  },
};

export default StripeService;
