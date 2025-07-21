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
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(1);

  const fetchProducts = useCallback(async () => {
    const result = await ProductService.getAll();
    setProducts(result);
  }, []);

  const fetchCategories = useCallback(async () => {
    const result = await CategoryService.getAll();
    setCategories(result);
    if (result.length > 0) setSelectedCategory(result[0].name);
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const filtered = products.filter((p) => {
    const cat = categories.find((c) => c.id === p.categoryId);
    return cat?.name === selectedCategory;
  });

  const totalRecords = filtered.length;
  const totalPages = Math.ceil(totalRecords / pageLimit);
  const paginated = filtered.slice((currentPage - 1) * pageLimit, currentPage * pageLimit);

  const onPageChanged = ({ currentPage }) => {
    setCurrentPage(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when category changes
  }, [selectedCategory]);

  return (
    <div className="w-100 overflow-hidden">
      {/* Banner */}
      <div className="p-5 bg-primary bs-cover banner-top" style={{ backgroundImage: "url(../../images/banner/50-Banner.webp)", height: "31vh" }}>
        <div className="container text-center pt-5 mt-5">
          <span className="fs-2 p-2 bg-white rounded shadow d-inline-block mt-3">
            {selectedCategory}
          </span>
        </div>
      </div>

      {/* Main Section */}
      <div className="container-fluid my-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <FilterCategory
              selected={selectedCategory}
              onSelect={(cat) => setSelectedCategory(cat)}
              categories={categories}
            />
          </div>

          {/* Product Grid/List */}
          <div className="col-md-9">
            <div className="row mb-3 align-items-center">
              <div className="col-md-6">
                <h6 className="fw-bold">
                  {filtered.length} result(s) for <span className="text-warning">"{selectedCategory}"</span>
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
                  <button type="button" onClick={() => setView("grid")} className={`btn btn-sm ${view === "grid" ? "btn-primary" : "btn-outline-primary"}`}><i className="bi bi-grid" /></button>
                  <button type="button" onClick={() => setView("list")} className={`btn btn-sm ${view === "list" ? "btn-primary" : "btn-outline-primary"}`}><i className="bi bi-list" /></button>
                </div>
              </div>
            </div>

            <div className="row g-3">
              {paginated.map((product) =>
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

              {paginated.length === 0 && (
                <div className="col-12 text-muted">No products found.</div>
              )}

              <div className="col-12">
                <Paging
                  totalRecords={totalRecords}
                  pageLimit={pageLimit}
                  pageNeighbours={1}
                  onPageChanged={onPageChanged}
                  sizing="pagination-sm"
                  alignment="justify-content-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
