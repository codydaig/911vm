import React from "react";
import Certification from "./Certification.jsx";
import AddCertification from "./AddCertification.jsx";

class CertificationView extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      adding: false,
      loaded: false
    };
  }

  handleClick(e) {
    const adding = this.state.adding;

    if (e.target.name === "add-btn" && (!adding && !this.props.allEditing)) {
      this.setState({ adding: !adding });
    } else if (e.target.name === "cancel-btn") {
      this.setState({ adding: !adding });
    }
  }

  render() {
    const {
      personId,
      volunteers,
      volunteerNames,
      certifications,
      certificationTypes,
      updatePerson,
    } = this.props;

    return (
      <div className="certifications-container">
        <div className="certification-header">
          <h2>Certifications</h2>
          <button name="add-btn" onClick={this.handleClick}>
            Add
          </button>
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
          <h3>Sign Date</h3>
        </div>
        <div className="cell">
          <h3>Actions</h3>
        </div>
        {certifications.map((data, i) => {
          return (
            <Certification
              data={data}
              key={i}
              certificationTypes={certificationTypes}
              volunteers={volunteers}
              volunteerNames={volunteerNames}
              personId={personId}
              updatePerson={updatePerson}
            />
          );
        })}
        {this.state.adding ? (
          <AddCertification
            certificationTypes={certificationTypes}
            personId={personId}
            handleClick={this.handleClick}
            updatePerson={updatePerson}
            volunteers={volunteers}
            volunteerNames={volunteerNames}
          />
        ) : null}
      </div>
    );
  }
}

export default CertificationView;
