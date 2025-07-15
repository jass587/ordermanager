const { Product, Category } = require("../models");

// Get all products with category name
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['name']
      }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Get product by ID with category name
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: {
        model: Category,
        as: 'category',
        attributes: ['name']
      }
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { title, price, description, image, categoryId } = req.body;
    const newProduct = await Product.create({ title, price, description, image, categoryId });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const { title, price, description, categoryId } = req.body;

    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Update image only if a new file is uploaded
    if (req.file) {
      product.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    // Update other fields
    await product.update({
      title,
      price,
      description,
      categoryId,
      image: product.image, // this will retain the old image if not updated
    });

    res.json(product);
  } catch (err) {
    console.error("Update Product Error:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
};


// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
