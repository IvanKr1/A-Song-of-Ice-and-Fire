import React,{useState} from "react";

const Select = ({ options, onChange }) => {
  return (
    <>
      <select onChange={(e) => onChange(e.target.value)}>
        {options.map((option, index) => {
          return <option value={option}>{option}</option>;
        })}
      </select>
    </>
  );
};

export default Select;
