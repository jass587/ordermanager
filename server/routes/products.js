// routes/products.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authenticate = require("../middleware/authenticateToken");
const { isAdmin } = require("../middleware/roleMiddleware");

router.get("/", authenticate, productController.getAllProducts);
router.get("/:id", authenticate, productController.getProductById);
router.post("/", authenticate, isAdmin, productController.createProduct);
router.put("/:id", authenticate, isAdmin, productController.updateProduct);
router.delete("/:id", authenticate, isAdmin, productController.deleteProduct);

module.exports = router;
