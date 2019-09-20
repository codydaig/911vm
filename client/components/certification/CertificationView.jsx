import React from "react";
import Certification from "./Certification.jsx";
import axios from "axios";

class CertificationView extends React.Component {
  constructor() {
    super();

    // this.getVolunteers = this.getVolunteers.bind(this);
    // this.getCertifications = this.getCertifications.bind(this);
    // this.handleChange = this.handleChange.bind(this);

    this.state = {
      personInfo: {}, //volunteer info
      personNames: [], //volunteer names for select elements
      certifications: {}, //certification info
      currentPerson: "", //currently selected person
      currentId: "",
      signOff: "",
      loaded: false,
      editing: false
    };
  }

  componentDidMount() {
    //   console.log(this.props.certification)
  }

  handleClick() {
    const editingValue = !this.state.editing;
    this.setState({ editing: editingValue });
  }

  render() {
    return (
      <div className="certifications-container">
        <div className="certification-header">
          <h2>Certifications</h2>
        </div>
        <div className="cell">
          <h3>Name</h3>
        </div>
        <div className="cell">
          <h3>Expiration Date</h3>
        </div>
        <div className="cell">
          <h3>Sign Off</h3>
        </div>
        <div className="cell">
          <h3>Edit</h3>
        </div>
        {this.props.certification.length !== 0 &&
          this.props.certification.map((data, i) => {
            return <Certification data={data} key={i} />;
          })}
        {/* {this.state.editing ? (
          <div>
            <button className="edit-certification" onClick={this.handleClick}>
              Editing
            </button>
            <button className="save-btn" onClick={this.handleSaveClick}>
              Save
            </button>
          </div>
        ) : (
          <div>
            <button className="edit-certification" onClick={this.handleClick}>
              Edit
            </button>
            <button
              className="create-certification"
              onClick={this.createCertification}
            >
              Add Certification
            </button>
          </div>
        )} */}
      </div>
    );
  }
}

export default CertificationView;
