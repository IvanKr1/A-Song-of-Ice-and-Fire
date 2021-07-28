import React from "react";
import "../scss/SearchField.scss";

const SearchField = ({ onSearchCulture }) => {
  return (
    <div className="searchField__container">
      <input
        type="input"
        className="searchField__input"
        name="culture"
        id="culture"
        required
        onChange={(e) => onSearchCulture(e.target.value)}
      />
      <label htmlFor="culture" className="searchField__label">
        Culture
      </label>
    </div>
  );
};

export default SearchField;
