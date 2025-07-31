import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axiosInstance from "@services/api/axiosInstance";
import { useCategoryForm } from "@hooks/useCategoryForm";
import { toast } from "react-toastify";

export default function CategoryModal({
  show,
  handleClose,
  categoryId,
  refreshCategories,
  mode = "edit",
}) {
  const [initialValues, setInitialValues] = useState({ name: "" });
  const isViewMode = mode === "view";
  const isAddMode = mode === "add";

  const handleSubmit = async (values) => {
    try {
      if (isAddMode) {
        await axiosInstance.post("/categories", values);
        toast.success("Category created successfully");
      } else {
        await axiosInstance.put(`/categories/${categoryId}`, values);
        toast.success("Category updated successfully");
      }

      refreshCategories?.();
      handleClose();
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error(err.response.data.message || "Validation error");
      } else {
        toast.error("Failed to submit category");
      }
      console.error("Submit failed:", err);
    }
  };

  const formik = useCategoryForm(initialValues, handleSubmit);

  useEffect(() => {
    if (categoryId && (mode === "edit" || mode === "view")) {
      axiosInstance
        .get(`/categories/${categoryId}`)
        .then((res) => setInitialValues(res.data.result[0]));
    } else if (mode === "add") {
      setInitialValues({ name: "" }); // Reset form for "add"
    }
  }, [categoryId, mode]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isViewMode
            ? "View Category"
            : isAddMode
              ? "Add Category"
              : "Edit Category"}
        </Modal.Title>
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
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        {!isViewMode && (
          <Button type="submit" variant="primary" onClick={formik.handleSubmit}>
            {isAddMode ? "Create" : "Save Changes"}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
