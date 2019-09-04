import React from "react";
import DatePicker from "react-datepicker";

const DateBox = props => {
  const label = props.label ? (
    <label htmlFor={name} className={props.labelClass}>
      {props.label}:
    </label>
  ) : null;
  return (
    <div className={props.groupClass}>
      {label}
      <DatePicker
        selected={props.selected}
        onChange={props.handle}
        name={"start_date"}
        value={props.selected}
        className="form-date"
        dateFormat="MM/dd/yyyy"
      />
    </div>
  );
};

export default DateBox;
