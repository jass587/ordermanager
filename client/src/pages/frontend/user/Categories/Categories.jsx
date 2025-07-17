import { useState, useEffect, useCallback, lazy } from "react";
import { data } from "../../../../data/banner";

// Lazy imports (only using FilterCategory for now)
const FilterCategory = lazy(() => import("../../../../components/frontend/filter/Category"));
// const FilterPrice = lazy(() => import("../../../../components/filter/Price"));
// const CardProductGrid = lazy(() => import("../../../../components/card/CardProductGrid"));
// const CardProductList = lazy(() => import("../../../../components/card/CardProductList"));
// const Paging = lazy(() => import("../../../../components/Paging"));
// const Breadcrumb = lazy(() => import("../../../../components/Breadcrumb"));

export default function ProductListView() {
    const [view, setView] = useState("list");
    const [currentProducts, setCurrentProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    const getProducts = useCallback(() => {
        let products = [...data.products];
        for (let i = 0; i < 5; i++) {
            products = products.concat(data.products);
        }
        return products;
    }, []);

    useEffect(() => {
        const total = getProducts().length;
        setTotalItems(total);
    }, [getProducts]);

    const handleViewChange = (v) => setView(v);

    return (
        <div style={{ width: '100vw', height : '100vh', overflowX: "hidden" }}>
            {/* Banner */}
            <div
                className="p-5 bg-primary bs-cover"
                style={{
                    backgroundImage: "url(../../images/banner/50-Banner.webp)",
                    height: "31vh",
                }}
            >
                <div className="container text-center">
                    <span className="display-5 px-3 bg-white rounded shadow">T-Shirts</span>
                </div>
            </div>

            {/* Content */}
            <div className="container-fluid mb-3">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-md-3">
                        <FilterCategory />
                        {/* <FilterPrice /> */}
                    </div>

                    {/* Main Section */}
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-7 mt-3">
                                <span className="align-middle fw-bold">
                                    {totalItems} results for{" "}
                                    <span className="text-warning">"t-shirts"</span>
                                </span>
                            </div>
                            <div className="col-5 mt-3 d-flex justify-content-end">
                                <select className="form-select mw-180 float-start" aria-label="Sort">
                                    <option value={1}>Most Popular</option>
                                    <option value={2}>Latest items</option>
                                    <option value={3}>Trending</option>
                                    <option value={4}>Price low to high</option>
                                    <option value={5}>Price high to low</option>
                                </select>
                                <div className="btn-group ms-3" role="group">
                                    <button
                                        aria-label="Grid"
                                        type="button"
                                        onClick={() => handleViewChange("grid")}
                                        className={`btn ${view === "grid" ? "btn-primary" : "btn-outline-primary"
                                            }`}
                                    >
                                        <i className="bi bi-grid" />
                                    </button>
                                    <button
                                        aria-label="List"
                                        type="button"
                                        onClick={() => handleViewChange("list")}
                                        className={`btn ${view === "list" ? "btn-primary" : "btn-outline-primary"
                                            }`}
                                    >
                                        <i className="bi bi-list" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <hr />

                        {/* Product List/Grid Display Placeholder */}
                        {/* <div className="row g-3">
              {view === "grid" &&
                currentProducts.map((product, idx) => (
                  <div key={idx} className="col-md-4">
                    <CardProductGrid data={product} />
                  </div>
                ))}

              {view === "list" &&
                currentProducts.map((product, idx) => (
                  <div key={idx} className="col-md-12">
                    <CardProductList data={product} />
                  </div>
                ))}
            </div> */}

                        <hr />

                        {/* Paging Placeholder */}
                        {/* <Paging
              totalRecords={totalItems}
              pageLimit={9}
              pageNeighbours={3}
              onPageChanged={onPageChanged}
              sizing=""
              alignment="justify-content-center"
            /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
