import React from "react";

const EditingPersonalInfo = ({ personInfo, onChange }) => {
  return (
    <div>
      <div className="personal-info">
        <div className="personal-info-header">
          <h1>
            {personInfo.first_name} {personInfo.last_name}
          </h1>
        </div>
        <form>
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
            <button>Edit</button>
          </div>
          <div className="cell">
            <button>Cancel</button>
          </div>

          <div className="cell">
            <p>
              <input
                type="text"
                placeholder={personInfo.email_address}
                id="email_address"
                onChange={onChange}
              />
            </p>
          </div>
          <div className="cell">
            <input
              type="text"
              minLength="10"
              maxLength="10"
              placeholder={personInfo.phone_number}
              id="phone_number"
              onChange={onChange}
            />
          </div>
          <div className="cell">
            <select
              defaultValue={personInfo.is_admin ? "true" : "false"}
              id="is_admin"
              onChange={onChange}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="cell">
            <select
              defaultValue={personInfo.is_volunteer ? "true" : "false"}
              id="is_volunteer"
              onChange={onChange}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditingPersonalInfo;
