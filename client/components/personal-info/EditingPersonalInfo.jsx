import React from "react";
import Input from "../../elements/Input.jsx";
import DateBox from "../../elements/DateBox.jsx";

const EditingPersonalInfo = props => {
  const { personInfo } = props;
  let startDate = new Date();
  let year = "";

  if (personInfo.start_date) {
    startDate = personInfo.start_date.split("-");
    year = startDate.shift();
    startDate.push(year);
    startDate = startDate.join("-");
  }

  return (
    <React.Fragment>
      <div className="cell">
        <Input
          name="first_name"
          handle={props.handleChange}
          placeholder={personInfo.first_name}
          value={personInfo.first_name}
        />
      </div>
      <div className="cell">
        <Input
          name="last_name"
          handle={props.handleChange}
          placeholder={personInfo.last_name}
          value={personInfo.last_name}
        />
      </div>
      <div className="cell">
        <Input
          name="email_address"
          handle={props.handleChange}
          placeholder={personInfo.email_address}
          value={personInfo.email_address}
        />
      </div>
      <div className="cell">
        <Input
          name="phone_number"
          handle={props.handleChange}
          placeholder={personInfo.phone_number}
          value={personInfo.phone_number}
        />
      </div>
      <div className="cell">
        {/* <Select
          name="is_admin"
          options={['yes', 'no']}
          handle={props.handleChange} 
        /> */}
        <p>{personInfo.class}</p>
      </div>
      <div className="cell">
        <DateBox
          name="start-date"
          selected={new Date(startDate)}
          handle={props.handleStartDate}
        />
      </div>
      <div className="cell">
        <button
          name="save-btn"
          className="edit-certification"
          onClick={props.handleClick}
        >
          Save
        </button>
        <button
          name="cancel-btn"
          className="edit-certification"
          onClick={props.handleClick}
        >
          Cancel
        </button>
      </div>
    </React.Fragment>
  );
};

export default EditingPersonalInfo;
