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
      editing: false,
      adding: false
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
    const editingValue = this.state.editing;
    const adding = this.state.adding;

    if (e.target.name === "add-btn") {
      if (!adding) {
        this.setState({ adding: !adding });
      }
    } else if (
      e.target.name === "cancel-btn" ||
      e.target.name === "save-btn"
    ) {
      this.setState({ adding: !adding });
    } else if (e.target.name === "edit-btn") {
      this.setState({ editing: !editingValue });
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
                />
              );
            })}
          {this.state.adding ? (
            <AddCertification
              certificationTypes={this.state.certificationTypes}
              signOffName={this.props.signOffName}
              signOffId={this.props.signOffId}
              personId={this.props.personId}
              handleClick={this.handleClick}
              updatePerson={this.props.updatePerson}
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
