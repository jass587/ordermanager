import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = () => {
    if (query.trim()) {
      searchParams.set("search", query.trim());
      searchParams.delete("page"); // reset to page 1
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
        <i className="bi bi-search" />
      </button>
    </div>
  );
};

export default Search;
