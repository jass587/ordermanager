import { useEffect, useState } from "react";
import ProductService from "../../../services/api/products";
import CategoryService from "../../../services/api/categories"
import ProductModal from "../Modals/ProductModal";
import ETable from "../../../components/backend/Tables/Common/eTable";

  export const ProductsTable = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("view");

    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAll();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await CategoryService.getAll();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    useEffect(() => {
      fetchProducts();
      fetchCategories();
    }, []);

    const getCategoryName = (categoryId) => {
      const cat = categories.find((c) => c.id === categoryId);
      return cat ? cat.name : "N/A";
    };

    const handleView = (id) => {
      setSelectedProductId(id);
      setModalMode("view");
      setShowModal(true);
    };

    const handleEdit = (id) => {
      setSelectedProductId(id);
      setModalMode("edit");
      setShowModal(true);
    };

    const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this product?")) return;

      try {
        await ProductService.delete(id);
        fetchProducts();
      } catch (err) {
        console.error("Failed to delete product:", err);
      }
    };

    return (
      <>
        <ProductModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          productId={selectedProductId}
          refreshProducts={fetchProducts}
          mode={modalMode}
        />

        <ETable
          data={products}
          title="Products"
          columns={[
            { label: "#", key: "id" },
            { label: "Title", key: "title" },
            { label: "Price", key: "price" },
            {
              label: "Category",
              key: "categoryId",
              render: (val) => getCategoryName(val),
            },
            { label: "Description", key: "description" },
            {
              label: "Image",
              key: "image",
              render: (val, row) => {
                console.log(val)
                return (
                <img
                  src={val || "/fallback-image.png"}
                  alt={row.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fallback-image.webp";
                  }}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
              )},
            },
            {
              label: "Created At",
              key: "createdAt",
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
