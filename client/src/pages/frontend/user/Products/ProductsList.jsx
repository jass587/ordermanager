import { useState, useEffect, useCallback, lazy } from "react";
import { data } from "../../../../data/banner";
import CardProductGrid from "../../../../components/frontend/card/CardProductGrid";
import CardProductList from "../../../../components/frontend/card/CardProductList";

// Lazy load FilterCategory
const FilterCategory = lazy(() => import("../../../../components/frontend/filter/FilterCategory"));

export default function ProductsList() {
    const [view, setView] = useState("grid"); // "grid" or "list"
    const [selectedCategory, setSelectedCategory] = useState("Clothing");
    const [products, setProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    const getProducts = useCallback(() => data.products, []);

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
                                    <div className="col-md-4 mb-4" key={product.id}>
                                        <CardProductGrid data={product} />
                                    </div>
                                ) : (
                                    <div className="col-12" key={product.id}>
                                        <CardProductList data={product} />
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
