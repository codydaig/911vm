import React from "react";
import Certification from "./Certification.jsx";
import axios from "axios";
import EditingCertification from "./EditingCertification.jsx";
import AddCertification from "./AddCertification.jsx";

class CertificationView extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      loaded: false,
      adding: false,
      certificationTypes: {}
    };
  }

  componentDidMount() {
    let certTypes = {};

    axios
      .get("/api/certification")
      .then(response => {
        response.data.data.forEach(cert => {
          certTypes[cert.name] = cert.id;
        });
        this.setState({
          certificationTypes: certTypes,
          loaded: true
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  handleClick(e) {
    const adding = this.state.adding;

    if (e.target.name === "add-btn" && (!adding && !this.props.allEditing)) {
      this.setState({ adding: !adding });
      this.props.handleAllEditing();
    } else if (e.target.name === "cancel-btn") {
      this.setState({ adding: !adding });
      this.props.handleAllEditing();
    }
  }

  render() {
    if (this.state.loaded) {
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
          {this.props.certifications.length !== 0 &&
            this.props.certifications.map((data, i) => {
              return (
                <Certification
                  data={data}
                  key={i}
                  certificationTypes={this.state.certificationTypes}
                  volunteers={this.props.volunteers}
                  volunteerNames={this.props.volunteerNames}
                  personId={this.props.personId}
                  updatePerson={this.props.updatePerson}
                  allEditing={this.props.allEditing}
                  handleAllEditing={this.props.handleAllEditing}
                />
              );
            })}
          {this.state.adding && this.props.allEditing ? (
            <AddCertification
              certificationTypes={this.state.certificationTypes}
              personId={this.props.personId}
              handleClick={this.handleClick}
              updatePerson={this.props.updatePerson}
              volunteers={this.props.volunteers}
              volunteerNames={this.props.volunteerNames}
            />
          ) : null}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default CertificationView;
