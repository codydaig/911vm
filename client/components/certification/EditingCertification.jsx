import React from "react";
import DateBox from "../DateBox.jsx";

class EditingCertification extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="certifications">
        <div className="cell">
          <select
            defaultValue={data.certification.id}
            name="certification_name"
            onChange={onChange}
          >
            {certificationTypes.map((cert, i) => {
              console.log("cert", cert);
              return (
                <option name={cert.name} data-id={cert.id} key={i}>
                  {cert.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="cell">
          <DateBox
            name="exp_date"
            // handle={this.handleChange}
            selected={new Date()}
          />
        </div>
        <div className="cell">
          <DateBox
            name="exp_date"
            // handle={this.handleChange}
            selected={new Date()}
          />
        </div>
        <div className="cell">
          <button className="save-btn" onClick={this.handleSaveClick}>
            Save
          </button>
          <button className="cancel-btn" onClick={this.handleSaveClick}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default EditingCertification;
