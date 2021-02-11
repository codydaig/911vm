import React from "react";
import DateBox from "../../elements/DateBox.jsx";
import Select from "../../elements/Select.jsx";

const EditingCertification = props => {
  let { data, volunteerNames, handleChange } = props;
  let expirationDate = new Date();
  let signatureDate = new Date();
  let year = "";

  if (data.expriation_date) {
    expirationDate = data.expriation_date.split("-");
    year = expirationDate.shift();
    expirationDate.push(year);
    expirationDate = expirationDate.join("-");
  }
  if (data.signature_date) {
    signatureDate = data.signature_date.split("-");
    year = signatureDate.shift();
    signatureDate.push(year);
    signatureDate = signatureDate.join("-");
  }

  return (
    <React.Fragment>
      <div className="cell">
        <p>{data.name}</p>
      </div>
      <div className="cell">
        <DateBox
          name="exp_date"
          selected={new Date(expirationDate)}
          handle={props.handleExpDate}
        />
      </div>
      <div className="cell">
        <Select
          name="sign-off"
          options={volunteerNames}
          handle={handleChange}
          selected={data.signature_person_name}
        />
      </div>
      <div className="cell">
        <DateBox
          name="signoff-date"
          selected={new Date(signatureDate)}
          handle={props.handleSignOffDate}
        />
      </div>
      <div className="cell">
        <button name="save-btn" onClick={props.handleClick}>
          Save
        </button>
        <button name="cancel-btn" onClick={props.handleClick}>
          Cancel
        </button>
      </div>
    </React.Fragment>
  );
};

export default EditingCertification;
