import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useProductForm } from "@hooks/useProductForm";

import ProductService from "@services/api/products";
import CategoryService from "@services/api/categories";

export default function ProductModal({
  show,
  handleClose,
  productId,
  refreshProducts,
  mode = "edit",
}) {
  const [initialValues, setInitialValues] = useState({
    title: "",
    price: "",
    categoryId: "",
    description: "",
    image: "",
  });
  const [categories, setCategories] = useState([]);
  const isViewMode = mode === "view";

  const handleSubmit = async (values) => {
    try {
      await ProductService.update(productId, values);
      refreshProducts();
      handleClose();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const formik = useProductForm(initialValues, handleSubmit);

  useEffect(() => {
    if (productId && show) {
      ProductService.getById(productId)
        .then((res) => {
          const product = res;
          if (product) setInitialValues(product);
        })
        .catch((err) => console.error("Failed to fetch product:", err));

      CategoryService.getAll()
        .then((res) => setCategories(res))
        .catch((err) => console.error("Failed to fetch categories:", err));
    }
  }, [productId, show]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isViewMode ? "View Product" : "Edit Product"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              disabled={isViewMode}
              isInvalid={formik.touched.title && !!formik.errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              disabled={isViewMode}
              isInvalid={formik.touched.price && !!formik.errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.price}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              disabled={isViewMode}
              isInvalid={formik.touched.categoryId && !!formik.errors.categoryId}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formik.errors.categoryId}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              disabled={isViewMode}
              isInvalid={formik.touched.description && !!formik.errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image Preview</Form.Label>
            <div className="text-center">
              <img
                src={formik.values.image || "/fallback-image.png"}
                alt="Product"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fallback-image.webp";
                }}
                style={{
                  maxWidth: "100%",
                  height: "200px",
                  objectFit: "cover",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                }}
              />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        {!isViewMode && (
          <Button type="submit" variant="primary" onClick={formik.handleSubmit}>
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

