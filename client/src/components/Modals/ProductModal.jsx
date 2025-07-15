import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/api/axiosInstance";

export default function ProductModal({ show, handleClose, productId, refreshProducts, mode = "edit" }) {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    categoryId: "",
    description: "",
    image: ""
  });

  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);

  const isViewMode = mode === "view";

  useEffect(() => {
    if (productId) {
      axiosInstance.get(`/products/${productId}`)
        .then(res => setProduct(res.data));
    }
    axiosInstance.get("/categories").then(res => setCategories(res.data));
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("price", product.price);
      formData.append("categoryId", product.categoryId);
      formData.append("description", product.description);
      if (file) formData.append("image", file);

      await axiosInstance.put(`/products/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      refreshProducts();
      handleClose();
    } catch (err) {
      console.error("Error updating product", err);
    }
  };

  if (!productId) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isViewMode ? "View Product" : "Edit Product"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={product.title}
            onChange={handleChange}
            disabled={isViewMode}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            disabled={isViewMode}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            disabled={isViewMode}
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={product.description}
            onChange={handleChange}
            disabled={isViewMode}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            disabled={isViewMode}
          />
          {product.image && (
            <img
              src={product.image}
              alt="Preview"
              className="mt-2"
              style={{ width: "100px", height: "auto" }}
            />
          )}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {isViewMode ? "Close" : "Cancel"}
        </Button>
        {!isViewMode && (
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}