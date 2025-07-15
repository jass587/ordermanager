import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axiosInstance from "../../services/api/axiosInstance";

export default function CategoryModal({
  show,
  handleClose,
  categoryId,
  refreshCategories,
  mode = "edit" // default to 'edit'
}) {
  const [category, setCategory] = useState({ name: "" });

  // Fetch category data on open
  useEffect(() => {
    if (categoryId) {
      axiosInstance.get(`/categories/${categoryId}`)
        .then(res => setCategory(res.data))
        .catch(err => console.error("Error loading category", err));
    }
  }, [categoryId]);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.put(`/categories/${categoryId}`, { name: category.name });
      refreshCategories();
      handleClose();
    } catch (err) {
      console.error("Error updating category", err);
    }
  };

  if (!categoryId) return null;

  const isViewMode = mode === "view";

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isViewMode ? "View Category" : "Edit Category"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={category.name}
            onChange={handleChange}
            placeholder="Enter category name"
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
