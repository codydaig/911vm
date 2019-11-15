import React from "react";

const DefaultCertification = props => {
  return (
    <React.Fragment>
      <div className="cell">
        <p>{props.data.name}</p>
      </div>
      <div className="cell">
        <p>{props.data.expriation_date}</p>
      </div>
      <div className="cell">
        <p>{props.data.signature_person_name}</p>
      </div>
      <div className="cell">
        <p>{props.data.signature_date}</p>
      </div>
      <div className="cell">
        <button
          name="edit-btn"
          className="edit-certification"
          onClick={props.handleClick}
        >
          Edit
        </button>
        <button name="delete-btn">Delete</button>
      </div>
    </React.Fragment>
  );
};

export default DefaultCertification;
