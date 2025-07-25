const router = require("express").Router();
const controller = require("../controllers/orderController");
const authenticateToken = require("../middleware/authenticateToken");
const { isAdmin } = require('../middleware/roleMiddleware.js');
const { isUser } = require("../middleware/roleMiddleware");

router.use(authenticateToken);

router.post("/", isUser, controller.createOrder);
router.get("/", isAdmin, controller.getAllOrders);
router.get("/:id", controller.getOrderById);

module.exports = router;
