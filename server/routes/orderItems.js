const router = require("express").Router();
const controller = require("../controllers/orderItemController");
const authenticateToken = require("../middleware/authenticateToken");
const { isAdmin } = require("../middleware/roleMiddleware");

router.use(authenticateToken);

router.get("/", isAdmin, controller.getAllOrderItems);
router.get("/:id", isAdmin, controller.getOrderItemById);

module.exports = router;
