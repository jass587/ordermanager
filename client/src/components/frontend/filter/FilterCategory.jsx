export default function FilterCategory({ selected, onSelect }) {
  const categories = [
    "Clothing",
    "Leather Bag",
    "Trousers",
    "Sweater & Cardigans",
    "High Heels",
    "Coats & Jackets",
  ];

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
                  key={cat}
                  className={`list-group-item ${
                    selected === cat ? "active fw-bold" : ""
                  }`}
                  role="button"
                  onClick={() => onSelect(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
