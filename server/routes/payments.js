const router = require("express").Router();
const controller = require("../controllers/paymentController");
const authenticateToken = require("../middleware/authenticateToken");
const { isUser, isAdmin } = require("../middleware/roleMiddleware");

router.use(authenticateToken);

router.post("/", isUser, controller.createPayment);
router.get("/", isAdmin, controller.getAllPayments);
router.get("/:id", isAdmin, controller.getPaymentById); // successful payments only

module.exports = router;
