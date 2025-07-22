// routes/products.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authenticate = require("../middleware/authenticateToken");
const { isAdmin } = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload"); 

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", authenticate, isAdmin, productController.createProduct);
router.put("/:id", authenticate, isAdmin, upload.single("image"), productController.updateProduct);
router.delete("/:id", authenticate, isAdmin, upload.single("image"), productController.deleteProduct);
router.delete("/:id", authenticate, isAdmin, upload.single("image"), productController.deleteProduct);

module.exports = router;
