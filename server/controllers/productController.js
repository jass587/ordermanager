const { Product, Category } = require("../models");
const { Op } = require("sequelize");

// Get all products with category name

exports.getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 6,
      sort = "latest",
      search = "",
    } = req.query;

    const offset = (page - 1) * limit;

    // Prepare search filter (search across all products)
    const searchFilter = search
      ? {
          [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { description: { [Op.iLike]: `%${search}%` } },
          ],
        }
      : {};

    // Sorting
    let order = [["createdAt", "DESC"]];
    if (sort === "price_low") order = [["price", "ASC"]];
    else if (sort === "price_high") order = [["price", "DESC"]];

    // Fetch all products matching search (for accurate total)
    const allMatchingProducts = await Product.findAll({
      where: searchFilter,
    });

    const total = allMatchingProducts.length;
    const pages = Math.ceil(total / limit);

    // Fetch paginated + sorted products
    const products = await Product.findAll({
      where: searchFilter,
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
      order,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      message: "Products fetched successfully",
      status: 200,
      result: {
        products,
        total,
        page: parseInt(page),
        totalPages : pages,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", status: 500 });
  }
};

// Get product by ID with category name
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: {
        model: Category,
        as: 'category',
        attributes: ['name'],
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        status: 404,
        result: [],
      });
    }

    return res.status(200).json({
      message: "Product fetched successfully",
      status: 200,
      result: [product],
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch product",
      status: 500,
      result: [],
      error: err.message,
    });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { title, price, description, image, categoryId } = req.body;

    const newProduct = await Product.create({
      title,
      price,
      description,
      image,
      categoryId,
    });

    return res.status(201).json({
      message: "Product created successfully",
      status: 201,
      result: [newProduct],
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to create product",
      status: 500,
      result: [],
      error: err.message,
    });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const { title, price, description, categoryId } = req.body;

    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        status: 404,
        result: [],
      });
    }

    // Update image if file uploaded
    if (req.file) {
      product.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    await product.update({
      title,
      price,
      description,
      categoryId,
      image: product.image,
    });

    return res.status(200).json({
      message: "Product updated successfully",
      status: 200,
      result: [product],
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to update product",
      status: 500,
      result: [],
      error: err.message,
    });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        status: 404,
        result: [],
      });
    }

    await product.destroy();

    return res.status(200).json({
      message: "Product deleted successfully",
      status: 200,
      result: [],
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to delete product",
      status: 500,
      result: [],
      error: err.message,
    });
  }
};