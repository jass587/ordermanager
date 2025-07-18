import { useEffect, useState } from "react";
import CategoryService from "../../../services/api/categories";

export default function FilterCategory({ selected, onSelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoryService.getAll();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="accordion mb-3" id="categoryAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingFilterCategory">
          <button
            className="accordion-button text-dark bg-light fw-bold text-uppercase"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filterCategory"
            aria-expanded="true"
            aria-controls="filterCategory"
          >
            Categories
          </button>
        </h2>
        <div
          id="filterCategory"
          className="accordion-collapse collapse show"
          aria-labelledby="headingFilterCategory"
        >
          <div className="accordion-body p-0">
            <ul className="list-group list-group-flush">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className={`list-group-item ${
                    selected === cat.name ? "active fw-bold" : ""
                  }`}
                  role="button"
                  onClick={() => onSelect(cat.name)}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
