import { useEffect, useState } from "react";
import ETable from "@components/backend/Tables/Common/eTable";
import CategoryModal from "@components/backend/Modals/CategoryModal";
import CategoryService from "@services/api/categories";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

export const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");

  const fetchCategories = async () => {
    try {
      const data = await CategoryService.getAll();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleView = (item) => {
    setSelectedId(item.id);
    setModalMode("view");
    setShowModal(true);
  };

  const handleEdit = (id) => {
    setSelectedId(id);
    setModalMode("edit");
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await CategoryService.delete(id);
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleAdd = () => {
    setSelectedId(null);
    setModalMode("add");
    setShowModal(true);
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={handleAdd}>
          + Add Category
        </Button>
      </div>

      <CategoryModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        categoryId={selectedId}
        refreshCategories={fetchCategories}
        mode={modalMode}
      />

      <ETable
        data={categories}
        title="Categories"
        columns={[
          { label: "#", key: "id" },
          { label: "Name", key: "name" },
          {
            label: "Created At",
            key: "createdAt",
            render: (val) => new Date(val).toLocaleDateString(),
          },
          {
            label: "Updated At",
            key: "updatedAt",
            render: (val) => new Date(val).toLocaleDateString(),
          },
        ]}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
};
