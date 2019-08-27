import React from "react";

const Checkbox = props => {
  return (
    <div className="form-group">
      <input
        className="form-checkbox"
        name={props.name}
        onChange={props.handle}
        value={props.option}
        type="checkbox"
        checked={props.checked}
      />
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
    </div>
  );
};

export default Checkbox;
