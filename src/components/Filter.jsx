//Consuelo
import React from "react";

//dropdown filter
const Filter = ({ label, options, onFilterChange }) => {
  const handleChange = (event) => {
    onFilterChange(event.target.value);
  };

  return (
    <div style={{ margin: "0 10px" }}>
      <label>{label}:</label>
      <select onChange={handleChange} style={{ marginLeft: "5px" }}>
        <option value="">All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
