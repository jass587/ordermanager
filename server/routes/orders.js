const router = require("express").Router();
const controller = require("../controllers/orderController");
const authenticateToken = require("../middleware/authenticateToken");
const { isAdmin } = require('../middleware/roleMiddleware.js');
const { isUser } = require("../middleware/roleMiddleware");

router.use(authenticateToken);

//get my orders
router.get("/my-orders", isUser, controller.getUserOrders);
router.get("/my-orders/:id", isUser, controller.getUserOrderById);

router.post("/", isUser, controller.createOrder);
router.get("/", isAdmin, controller.getAllOrders);
router.get("/:id", isAdmin, controller.getOrderById);


module.exports = router;
