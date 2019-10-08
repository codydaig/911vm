import React from "react";

const Checkbox = props => {
  return (
    <div className={props.groupClass}>
      <input
        className={props.checkboxClass}
        name={props.name}
        onChange={props.handle}
        value={props.option}
        type="checkbox"
        checked={props.checked}
      />
      <label htmlFor={props.name} className={props.groupClass}>
        {props.title}
      </label>
    </div>
  );
};

export default Checkbox;
