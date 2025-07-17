import { useState } from "react";
import FilterCategory from "../filter/FilterCategory";

const products = [
    { id: 1, title: "Red T-Shirt", category: "Clothing", image: "/images/red-tshirt.jpg" },
    { id: 2, title: "Leather Sling Bag", category: "Leather Bag", image: "/images/leather-bag.jpg" },
    { id: 3, title: "Slim Fit Trousers", category: "Trousers", image: "/images/trousers.jpg" },
    { id: 4, title: "Wool Sweater", category: "Sweater & Cardigans", image: "/images/sweater.jpg" },
    { id: 5, title: "High Heels Black", category: "High Heels", image: "/images/heels.jpg" },
    { id: 6, title: "Long Winter Coat", category: "Coats & Jackets", image: "/images/coat.jpg" },
];

export default function CategoryProductView() {
    const [selectedCategory, setSelectedCategory] = useState("Clothing");

    const filteredProducts = products.filter(
        (product) => product.category === selectedCategory
    );

    console.log("hi")
    return (
        <div className="container-fluid my-4">
            <div className="row">
                {/* Left Column - Category Filter */}
                <div className="col-md-3">
                    <FilterCategory
                        selected={selectedCategory}
                        onSelect={(cat) => setSelectedCategory(cat)}
                    />
                </div>

                {/* Right Column - Filtered Product List */}
                <div className="col-md-9">
                    <h5 className="mb-3">
                        {filteredProducts.length} result(s) for{" "}
                        <span className="text-primary fw-semibold">"{selectedCategory}"</span>
                    </h5>

                    <div className="row">
                        {filteredProducts.map((product) => (
                            <div className="col-md-4 mb-4" key={product.id}>
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="card-img-top"
                                        onError={(e) => (e.target.src = "/fallback-image.webp")}
                                    />
                                    <div className="card-body">
                                        <h6 className="card-title">{product.title}</h6>
                                        <button className="btn btn-sm btn-outline-primary">View Product</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filteredProducts.length === 0 && (
                            <div className="col-12 text-muted">No products found.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
