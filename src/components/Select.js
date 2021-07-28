import React from "react";

const Select = ({ options, onChange}) => {
  return (
    <>
      <select onChange={(e) => onChange(e.target.value)}>
        {options.map(option => {
          return <option value={option}>{option}</option>;
        })}
      </select>
    </>
  );
};

export default Select;
