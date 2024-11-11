//Connor and Consuelo
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleInputChange}
      placeholder="Search posts..."
    />
  );
}
