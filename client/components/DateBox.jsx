import React from "react";
import DatePicker from "react-datepicker";

const DateBox = props => {
  return (
    <div className="form-group">
      <label htmlFor="form-label" className="form-label">
        {props.label}:
      </label>
      <DatePicker
        selected={props.selected}
        onChange={props.handle}
        name={"start_date"}
        value={props.selected}
        className="form-date"
        dateFormat='MM/dd/yyyy'
      />
    </div>
  );
};

export default DateBox;
