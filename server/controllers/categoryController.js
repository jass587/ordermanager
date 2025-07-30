const db = require("../models");
const Category = db.Category;
const { Op, Sequelize } = require("sequelize");

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // 🔒 Check if category already exists
    const existingCategory = await Category.findOne({ where: { name } });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
        status: 400,
        result: [],
      });
    }

    // ✅ Create new category if not duplicate
    const category = await Category.create({ name });

    return res.status(201).json({
      message: "Category added successfully",
      status: 201,
      result: [category],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add category",
      status: 500,
      result: [],
      error: error.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      order: [["name", "ASC"]],
    });

    const seen = new Set();
    const uniqueCategories = [];

    for (const cat of allCategories) {
      const lowerName = cat.name.toLowerCase(); // 👈 Normalize case
      if (!seen.has(lowerName)) {
        seen.add(lowerName);
        uniqueCategories.push(cat);
      }
    }

    return res.status(200).json({
      message: "Unique categories (case-insensitive) fetched successfully",
      status: 200,
      result: uniqueCategories,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch categories",
      status: 500,
      result: [],
      error: error.message,
    });
  }
};




exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        status: 404,
        result: [],
      });
    }

    return res.status(200).json({
      message: "Category fetched successfully",
      status: 200,
      result: [category],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch category",
      status: 500,
      result: [],
      error: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryId = req.params.id;

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        status: 404,
        result: [],
      });
    }

    // 🔒 Check for duplicate category name (excluding current)
    const existingCategory = await Category.findOne({
      where: {
        name,
        id: { [Op.ne]: categoryId }, // ✅ Not the same category
      },
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category with this name already exists",
        status: 400,
        result: [],
      });
    }

    // ✅ Update category name
    category.name = name;
    await category.save();

    return res.status(200).json({
      message: "Category updated successfully",
      status: 200,
      result: [category],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update category",
      status: 500,
      result: [],
      error: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        status: 404,
        result: [],
      });
    }

    await category.destroy();

    return res.status(200).json({
      message: "Category deleted successfully",
      status: 200,
      result: [],
    });
  } catch (error) {
    const dbError = error?.original?.message || error.message;

    // ✅ Catch FK constraint violation
    if (
      dbError.includes(`"categoryId"`) &&
      dbError.includes(`violates not-null constraint`)
    ) {
      return res.status(400).json({
        message: "Cannot delete category. Products are assigned to it.",
        status: 400,
        result: [],
      });
    }

    // Generic fallback
    return res.status(500).json({
      message: "Failed to delete category",
      status: 500,
      result: [],
      error: dbError,
    });
  }
};


