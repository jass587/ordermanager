const db = require("../models");
const Category = db.Category;

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
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
    const categories = await Category.findAll();

    return res.status(200).json({
      message: "Categories fetched successfully",
      status: 200,
      result: categories,
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
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        status: 404,
        result: [],
      });
    }

    category.name = req.body.name;
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
    return res.status(500).json({
      message: "Failed to delete category",
      status: 500,
      result: [],
      error: error.message,
    });
  }
};
