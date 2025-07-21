import { useState, useEffect, useCallback, lazy } from "react";
import CardProductGrid from "../../../../components/frontend/card/CardProductGrid";
import CardProductList from "../../../../components/frontend/card/CardProductList";
import ProductService from "../../../../services/api/products";
import CategoryService from "../../../../services/api/categories";
import Paging from "../../../../components/Paging";

const FilterCategory = lazy(() => import("../../../../components/frontend/filter/FilterCategory"));

export default function ProductsList() {
  const [view, setView] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const pageLimit = 1; // Backend controls this value

  const fetchProducts = useCallback(async () => {
    const res = await ProductService.getAll({
      page: currentPage,
      category: selectedCategory,
    });
    console.log("products", products)
    setProducts(res.products);
    setTotal(res.total);
  }, [currentPage, selectedCategory]);

  const fetchCategories = useCallback(async () => {
    const result = await CategoryService.getAll();
    setCategories(result);

    const defaultCategory = result.find(cat => cat.name.toLowerCase() === "electronics");
    setSelectedCategory(defaultCategory ? defaultCategory.name : result[0]?.name);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const onPageChanged = ({ currentPage }) => {
    setCurrentPage(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-100 overflow-hidden">
      <div
        className="p-5 bg-primary bs-cover banner-top"
        style={{ backgroundImage: "url(../../images/banner/50-Banner.webp)", height: "31vh" }}
      >
        <div className="container text-center pt-5 mt-5">
          <span className="fs-2 p-2 bg-white rounded shadow d-inline-block mt-3">
            {selectedCategory}
          </span>
        </div>
      </div>

      <div className="container-fluid my-4">
        <div className="row">
          <div className="col-md-3">
            <FilterCategory
              selected={selectedCategory}
              onSelect={(cat) => {
                setSelectedCategory(cat);
                setCurrentPage(1); // Reset to page 1 when category changes
              }}
              categories={categories}
            />
          </div>

          <div className="col-md-9">
            <div className="row mb-3 align-items-center">
              <div className="col-md-6">
                <h6 className="fw-bold">
                  {total} result(s) for <span className="text-warning">"{selectedCategory}"</span>
                </h6>
              </div>
              <div className="col-md-6 d-flex justify-content-end align-items-center gap-2">
                <select className="form-select w-auto">
                  <option value={1}>Most Popular</option>
                  <option value={2}>Latest items</option>
                  <option value={3}>Trending</option>
                  <option value={4}>Price low to high</option>
                  <option value={5}>Price high to low</option>
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
              {products.map((product) =>
                view === "grid" ? (
                  <div className="col-md-4 mb-4" key={product.id}>
                    <CardProductGrid data={product} />
                  </div>
                ) : (
                  <div className="col-12" key={product.id}>
                    <CardProductList data={product} />
                  </div>
                )
              )}

              {products.length === 0 && (
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
