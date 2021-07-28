import React from "react";
import "../scss/Select.scss"

const Select = ({ options, onChange, label}) => {
  return (
    <div className="select__container">
    <label>{label}</label>
      <select onChange={(e) => onChange(e.target.value)}>
        {options.map((option, index) => {
          return <option key={index} value={option}>{option}</option>;
        })}
      </select>
    </div>
  );
};

export default Select;
