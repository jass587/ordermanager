import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axiosInstance from "@services/api/axiosInstance";
import { useCategoryForm } from "@hooks/useCategoryForm";

export default function CategoryModal({ show, handleClose, categoryId, refreshCategories, mode = "edit" }) {
  const [initialValues, setInitialValues] = useState({ name: "" });
  const isViewMode = mode === "view";

  const handleSubmit = async (values) => {
    try {
      await axiosInstance.put(`/categories/${categoryId}`, values);
      toast.success("Category updated successfully"); // ✅ success message
      refreshCategories();
      handleClose();
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error(err.response.data.message || "Validation error"); // ✅ e.g. duplicate
      } else {
        toast.error("Failed to update category");
      }
      console.error("Update failed:", err);
    }
  };

  const formik = useCategoryForm(initialValues, handleSubmit);

  useEffect(() => {
    if (categoryId) {
      axiosInstance.get(`/categories/${categoryId}`).then((res) => setInitialValues(res.data.result[0]));
    }
  }, [categoryId]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isViewMode ? "View Category" : "Edit Category"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              disabled={isViewMode}
              isInvalid={formik.touched.name && !!formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
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
