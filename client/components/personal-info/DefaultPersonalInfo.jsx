import React from "react";

const DefaultPersonalInfo = ({personInfo}) => {
  return (
    <div className="personal-info">
      <div className="personal-info-header">
        <h1>
          {personInfo.first_name} {personInfo.last_name}
        </h1>
      </div>
      <div className="cell">
        <h3>Email</h3>
      </div>
      <div className="cell">
        <h3>Phone Number</h3>
      </div>
      <div className="cell">
        <h3>Administrator</h3>
      </div>
      <div className="cell">
        <h3>Volunteer</h3>
      </div>
      <div className="cell">
        <p>{personInfo.email_address}</p>
      </div>
      <div className="cell">
        <p>{personInfo.phone_number}</p>
      </div>
      <div className="cell">
        <p>{personInfo.is_admin ? "Yes" : "No"}</p>
      </div>
      <div className="cell">
        <p>{personInfo.is_volunteer ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default DefaultPersonalInfo;