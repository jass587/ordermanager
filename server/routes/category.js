const express = require("express");
const router = express.Router();
const {
    addCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");
const authenticateToken = require("../middleware/authenticateToken");
const { isAdmin } = require('../middleware/roleMiddleware.js');

router.post("/", authenticateToken, isAdmin, addCategory);
router.get("/", getCategories);
router.get("/:id", getCategory);
router.put("/:id", authenticateToken, isAdmin, updateCategory);
router.delete("/:id", authenticateToken, isAdmin, deleteCategory);

module.exports = router;
