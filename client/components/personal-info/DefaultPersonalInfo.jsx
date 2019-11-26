import React from "react";

const DefaultPersonalInfo = props => {
  const { personInfo } = props;

  return (
    <React.Fragment>
      <div className="cell">
        <p>{personInfo.first_name}</p>
      </div>
      <div className="cell">
        <p>{personInfo.last_name}</p>
      </div>
      <div className="cell">
        <p>{personInfo.email_address}</p>
      </div>
      <div className="cell">
        <p>{personInfo.phone_number}</p>
      </div>
      <div className="cell">
        <p>{personInfo.class}</p>
      </div>
      <div className="cell">
        <p>{personInfo.start_date}</p>
      </div>
      <div className="cell">
        <button
          name="edit-btn"
          className="edit-certification"
          onClick={props.handleClick}
        >
          Edit
        </button>
      </div>
    </React.Fragment>
  );
};

export default DefaultPersonalInfo;