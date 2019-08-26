import React from "react";

const Select = props => {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={props.name}>
        {props.label}:{" "}
      </label>
      <select
        name={props.name}
        onChange={props.handle}
        className="form-select"
        value={props.selected}
      >
        {props.options.map(option => {
          return (
            <option key={option} value={option} name={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
