import { useState, useEffect, useCallback, lazy } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import CardProductGrid from "../../../../components/frontend/card/CardProductGrid";
import CardProductList from "../../../../components/frontend/card/CardProductList";
import ProductService from "../../../../services/api/products";
import CategoryService from "../../../../services/api/categories";
import Paging from "../../../../components/Paging";
import { addItem } from "../../../../redux/store/cartSlice";
import { toast } from 'react-toastify';

const FilterCategory = lazy(() => import("../../../../components/frontend/filter/FilterCategory"));

export default function ProductsList() {
  const [view, setView] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("Electronics");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("price_low");

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const effectiveCategory = searchTerm ? "" : selectedCategory;
  const pageLimit = 6;

  const fetchProducts = useCallback(async () => {
    try {
      const res = await ProductService.getAll({
        page: currentPage,
        category: effectiveCategory,
        sort,
        search: searchTerm,
      });
      setProducts(res.result.products || []);
      setTotal(res.result.total || 0);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
      setTotal(0);
    }
  }, [currentPage, selectedCategory, sort, searchTerm]);

  const fetchCategories = useCallback(async () => {
    try {
      const result = await CategoryService.getAll();
      setCategories(result);
      if (result.length > 0 && !selectedCategory) {
        setSelectedCategory("Electronics");
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sort]);

  const onPageChanged = ({ currentPage }) => {
    setCurrentPage(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (product) => {
    console.log(product)
    dispatch(addItem({
      productId: product.id,
      quantity: 1,
      productInfo: product,
    }));
    toast.success(`${product.title} added to cart`);
  };

  return (
    <div className="w-100" style={{ maxHeight: "calc(100vh - 180px)", overflowY: "auto" }}>
      <div
        className="p-5 bg-primary bs-cover banner-top"
        style={{ backgroundImage: 'url("/images/banner/50-Banner.webp")', height: "31vh" }}
      >
        <div className="container text-center pt-5 mt-5">
          <span className="fs-2 p-2 bg-white rounded shadow d-inline-block mt-3">
            {searchTerm ? searchTerm : selectedCategory}
          </span>
        </div>
      </div>

      <div className="container-fluid my-4">
        <div className="row">
          <div className="col-md-3">
            <FilterCategory
              selected={searchTerm ? "" : selectedCategory}
              onSelect={(cat) => {
                if (searchTerm) {
                  navigate("/products");
                }
                setSelectedCategory(cat);
              }}
              categories={categories}
            />
          </div>

          <div className="col-md-9">
            <div className="row mb-3 align-items-center">
              <div className="col-md-6">
                <h6 className="fw-bold">
                  {products.length} result(s) for {" "}
                  <span className="text-warning">
                    "{searchTerm ? searchTerm : selectedCategory}"
                  </span>
                </h6>
              </div>
              <div className="col-md-6 d-flex justify-content-end align-items-center gap-2">
                <select
                  className="form-select w-auto"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="price_low">Price low to high</option>
                  <option value="price_high">Price high to low</option>
                  <option value="latest">Latest items</option>
                </select>
                <div className="btn-group">
                  <button
                    type="button"
                    onClick={() => setView("grid")}
                    className={`btn btn-sm ${view === "grid" ? "btn-primary" : "btn-outline-primary"}`}
                  >
                    <i className="bi bi-grid" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("list")}
                    className={`btn btn-sm ${view === "list" ? "btn-primary" : "btn-outline-primary"}`}
                  >
                    <i className="bi bi-list" />
                  </button>
                </div>
              </div>
            </div>

            <div className="row g-3">
              {products.length > 0 ? (
                products.map((product) =>
                  view === "grid" ? (
                    <div className="col-md-4 mb-4" key={product.id}>
                      <CardProductGrid data={product} onAddToCart={handleAddToCart} />
                    </div>
                  ) : (
                    <div className="col-12" key={product.id}>
                      <CardProductList data={product} onAddToCart={handleAddToCart} />
                    </div>
                  )
                )
              ) : (
                <div className="col-12 text-muted">No products found.</div>
              )}

              {products.length > 0 && (
                <div className="col-12">
                  <Paging
                    totalRecords={total}
                    pageLimit={pageLimit}
                    pageNeighbours={1}
                    onPageChanged={onPageChanged}
                    sizing="pagination-sm"
                    alignment="justify-content-center"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
