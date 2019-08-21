import React from "react";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const DateBox = props => {
  return (
    <div className="form-group">
      <label htmlFor="form-label" className="form-label">
        {props.label}:
      </label>
      <DatePicker
        selected={props.selected}
        onChange={props.handleDate}
        name="startDate"
        className="form-date"
        dateFormat='MM/dd/yyyy'
      />
    </div>
  );
};

export default DateBox;
