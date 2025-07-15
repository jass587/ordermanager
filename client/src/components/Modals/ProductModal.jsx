import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axiosInstance from "../../services/api/axiosInstance";

export default function ProductModal({
  show,
  handleClose,
  productId,
  refreshProducts,
  mode = "edit" // default to 'edit'
}) {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    categoryId: ""
  });

  useEffect(() => {
    if (productId) {
      axiosInstance.get(`/products/${productId}`)
        .then(res => setProduct(res.data))
        .catch(err => console.error("Error loading product", err));
    }
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.put(`/products/${productId}`, {
        title: product.title,
        price: product.price,
        categoryId: product.categoryId
      });
      refreshProducts();
      handleClose();
    } catch (err) {
      console.error("Error updating product", err);
    }
  };

  if (!productId) return null;

  const isViewMode = mode === "view";

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
            placeholder="Enter product title"
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
            placeholder="Enter price"
            disabled={isViewMode}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category ID</Form.Label>
          <Form.Control
            name="categoryId"
            type="number"
            value={product.categoryId}
            onChange={handleChange}
            placeholder="Enter category ID"
            disabled={isViewMode}
          />
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
