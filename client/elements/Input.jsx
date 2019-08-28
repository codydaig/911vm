import React from "react";

const Input = props => {
  return (
    <div className={props.groupClass}>
      <label htmlFor={name} className={props.labelClass}>
        {props.label}:
      </label>
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