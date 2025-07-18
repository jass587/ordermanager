import { useState, useEffect, useCallback, lazy } from "react";
import CardProductGrid from "../../../../components/frontend/card/CardProductGrid";
import CardProductList from "../../../../components/frontend/card/CardProductList";
import ProductService from "../../../../services/api/products";
import CategoryService from "../../../../services/api/categories";

const FilterCategory = lazy(() => import("../../../../components/frontend/filter/FilterCategory"));

export default function ProductsList() {
  const [view, setView] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const fetchProducts = useCallback(async () => {
    const result = await ProductService.getAll();
    setProducts(result);
    setTotalItems(result.length);
  }, []);

  const fetchCategories = useCallback(async () => {
    const result = await CategoryService.getAll();
    setCategories(result);
    if (result.length > 0) setSelectedCategory(result[0].name); // default
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const filtered = products.filter((p) => {
    const cat = categories.find((c) => c.id === p.categoryId);
    return cat?.name === selectedCategory;
  });

  return (
    <div style={{ width: "100vw", overflowX: "hidden" }}>
      <div className="p-5 bg-primary bs-cover" style={{ backgroundImage: "url(../../images/banner/50-Banner.webp)", height: "31vh" }}>
        <div className="container text-center pt-3rem">
          <span className="display-5 px-3 bg-white rounded shadow">{selectedCategory}</span>
        </div>
      </div>

      <div className="container-fluid my-4">
        <div className="row">
          <div className="col-md-3">
            <FilterCategory
              selected={selectedCategory}
              onSelect={(cat) => setSelectedCategory(cat)}
              categories={categories}
            />
          </div>

          <div className="col-md-9">
            <div className="row mb-3">
              <div className="col-md-6">
                <h6 className="fw-bold">
                  {filtered.length} result(s) for <span className="text-warning">"{selectedCategory}"</span>
                </h6>
              </div>
              <div className="col-md-6 text-end">
                <div className="btn-group" role="group">
                  <button type="button" onClick={() => setView("grid")} className={`btn btn-sm ${view === "grid" ? "btn-primary" : "btn-outline-primary"}`}>
                    <i className="bi bi-grid" />
                  </button>
                  <button type="button" onClick={() => setView("list")} className={`btn btn-sm ${view === "list" ? "btn-primary" : "btn-outline-primary"}`}>
                    <i className="bi bi-list" />
                  </button>
                </div>
              </div>
            </div>

            <div className="row g-3">
              {filtered.map((product) =>
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

              {filtered.length === 0 && <div className="col-12 text-muted">No products found.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
