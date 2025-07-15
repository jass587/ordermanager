import { useEffect, useState } from "react";
import {
  Table,
  Card,
  Button,
  Dropdown,
  ButtonGroup,
  Pagination,
  Nav,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faEllipsisH,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../services/api/axiosInstance";
import ProductModal from "../Modals/ProductModal";

export const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleViewClick = (id) => {
    setSelectedProductId(id);
    setModalMode("view");
    setShowModal(true);
  };

  const handleEditClick = (id) => {
    setSelectedProductId(id);
    setModalMode("edit");
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;
    try {
      await axiosInstance.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const getCategoryName = (categoryId) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.name : "N/A";
  };

  const TableRow = ({ id, title, price, categoryId, description, image, createdAt }) => (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{price}</td>
      <td>{getCategoryName(categoryId)}</td>
      <td>{description}</td>
      <td>
        {image ? (
          <img src={image} alt={title} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
        ) : "No Image"}
      </td>
      <td>{new Date(createdAt).toLocaleDateString()}</td>
      <td>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
            <span className="icon icon-sm">
              <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleViewClick(id)}>
              <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleEditClick(id)}>
              <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
            </Dropdown.Item>
            <Dropdown.Item className="text-danger" onClick={() => handleDelete(id)}>
              <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );

  return (
    <>
      <ProductModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        productId={selectedProductId}
        refreshProducts={fetchProducts}
        mode={modalMode}
      />
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>Description</th>
                <th>Image</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <TableRow key={`product-${product.id}`} {...product} />
              ))}
            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev>Previous</Pagination.Prev>
                <Pagination.Item active>1</Pagination.Item>
                <Pagination.Next>Next</Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Showing <b>{products.length}</b> entries
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
};