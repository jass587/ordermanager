import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Search as SearchIcon } from "react-bootstrap-icons";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;

    if (location.pathname.startsWith("/home")) {
      // 👇 Redirect to products with search query
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    } else {
      // 👇 Already on /products, just update searchParams
      searchParams.set("search", query.trim());
      searchParams.delete("page"); // reset pagination
      setSearchParams(searchParams);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="btn btn-outline-primary" onClick={handleSearch}>
        <SearchIcon size={18} />
      </button>
    </div>
  );
};

export default Search;
