import React from "react";

const Input = props => {
  const label = props.label ? (
    <label htmlFor={name} className={props.labelClass}>
      {props.label}:&nbsp;
    </label>
  ) : null;
  return (
    <div className={props.groupClass}>
      {label} 
      <input
        className={props.labelClass}
        name={props.name}
        type="text"
        onChange={props.handle}
        value={props.value}
      />
    </div>
  );
};

export default Input;