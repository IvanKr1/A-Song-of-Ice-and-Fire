import React from "react";
import "../scss/SearchField.scss"

const SearchField = ({ onSearchCulture }) => {
  return (
    <div className="searchField__container">
      <input
        className="searchField__input"
        type="text"
        placeholder="Search by Culture..."
        onChange={(e) => onSearchCulture(e.target.value)}
      />
    </div>
  );
};

export default SearchField;
