const express = require("express");
const router = express.Router();
const {
    addCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");
const authenticateToken  = require("../middleware/authenticateToken");

router.post("/", authenticateToken, addCategory);
router.get("/", authenticateToken, getCategories);
router.get("/:id", authenticateToken, getCategory);
router.put("/:id", authenticateToken, updateCategory);
router.delete("/:id", authenticateToken, deleteCategory);

module.exports = router;
