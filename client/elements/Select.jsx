import React from "react";

const Select = props => {
  const label = props.label ? (
    <label htmlFor={name} className={props.labelClass}>
      {props.label}:
    </label>
  ) : null;
  return (
    <div className={props.groupClass}>
      {label}
      <select
        name={props.name}
        onChange={props.handle}
        className={props.selectClass}
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
