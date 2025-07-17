import { useState, useEffect, useCallback, lazy } from "react";
import { data } from "../../../../data/banner";

// Lazy load FilterCategory
const FilterCategory = lazy(() => import("../../../../components/frontend/filter/FilterCategory"));

export default function Categories() {
  const [view, setView] = useState("grid"); // "grid" or "list"
  const [selectedCategory, setSelectedCategory] = useState("Clothing");
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  // Get sample products
  const getProducts = useCallback(() => {
    let p = [...data.products];
    for (let i = 0; i < 4; i++) {
      p = p.concat(data.products); // repeat to mock data
    }
    return p;
  }, []);

  useEffect(() => {
    const all = getProducts();
    setProducts(all);
    setTotalItems(all.length);
  }, [getProducts]);

  // Filtered products
  const filtered = products.filter((p) => p.category === selectedCategory);

  return (
    <div style={{ width: "100vw", overflowX: "hidden" }}>
      {/* Banner */}
      <div
        className="p-5 bg-primary bs-cover"
        style={{
          backgroundImage: "url(../../images/banner/50-Banner.webp)",
          height: "31vh",
        }}
      >
        <div className="container text-center pt-3rem">
          <span className="display-5 px-3 bg-white rounded shadow">
            {selectedCategory}
          </span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="container-fluid my-4">
        <div className="row">
          {/* Sidebar - Filter */}
          <div className="col-md-3">
            <FilterCategory
              selected={selectedCategory}
              onSelect={(cat) => setSelectedCategory(cat)}
            />
          </div>

          {/* Right side - Products */}
          <div className="col-md-9">
            <div className="row mb-3">
              <div className="col-md-6">
                <h6 className="fw-bold">
                  {filtered.length} result(s) for{" "}
                  <span className="text-warning">"{selectedCategory}"</span>
                </h6>
              </div>
              <div className="col-md-6 text-end">
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    onClick={() => setView("grid")}
                    className={`btn btn-sm ${view === "grid" ? "btn-primary" : "btn-outline-primary"
                      }`}
                  >
                    <i className="bi bi-grid" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("list")}
                    className={`btn btn-sm ${view === "list" ? "btn-primary" : "btn-outline-primary"
                      }`}
                  >
                    <i className="bi bi-list" />
                  </button>
                </div>
              </div>
            </div>

            <div className="row g-3">
              {filtered.map((product) =>
                view === "grid" ? (
                  <div className="col-md-4" key={product.id}>
                    <div className="card h-100 shadow-sm">
                      <img
                        src={product.image}
                        className="card-img-top"
                        alt={product.title}
                        onError={(e) => (e.target.src = "/fallback-image.webp")}
                      />
                      <div className="card-body">
                        <h6 className="card-title">{product.title}</h6>
                        <button className="btn btn-sm btn-outline-primary">View Product</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="col-12" key={product.id}>
                    <div className="card shadow-sm d-flex flex-row">
                      <img
                        src={product.image}
                        className="img-fluid"
                        alt={product.title}
                        style={{ width: "150px", objectFit: "cover" }}
                        onError={(e) => (e.target.src = "/fallback-image.webp")}
                      />
                      <div className="card-body">
                        <h6 className="card-title">{product.title}</h6>
                        <p className="card-text text-muted">{product.category}</p>
                        <button className="btn btn-sm btn-outline-primary">View Product</button>
                      </div>
                    </div>
                  </div>
                )
              )}

              {filtered.length === 0 && (
                <div className="col-12 text-muted">No products found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
