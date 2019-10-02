import React from "react";
import DateBox from "../DateBox.jsx";
import Select from "../../elements/Select.jsx";
import axios from "axios";

class AddCertification extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.addCertification = this.addCertification.bind(this);
    this.handleSignOffDate = this.handleSignOffDate.bind(this);
    this.handleExpDate = this.handleExpDate.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      certId: "",
      exp_date: new Date(),
      signoff_date: new Date()
    };
  }

  componentDidMount() {
    this.setState({ certId: Object.values(this.props.certificationTypes)[0] });
  }

  handleExpDate(e) {
    this.setState({ exp_date: new Date(e) });
  }

  handleSignOffDate(e) {
    this.setState({ signoff_date: new Date(e) });
  }

  handleClick(e) {
      this.addCertification();
      this.props.handleClick(e);
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState({ certId: this.props.certificationTypes[value] });
  }

  addCertification() {
    const info = {
      signature_date: this.state.signoff_date.toISOString().split("T")[0],
      signature_person_id: this.props.signOffId,
      expriation_date: this.state.exp_date.toISOString().split("T")[0],
      certification_id: this.state.certId
    };

    axios
      .post(`/api/person/${this.props.personId}/certification`, info)
      .then(() => {
        this.props.updatePerson();
        alert("Successfully saved certification :)");
      })
      .catch(error => {
        alert("Error saving certification :(");
        console.log("error", error);
      });
  }

  render() {
    const { certificationTypes } = this.props;

    return (
      <div className="certifications">
        <div className="cell">
          <Select
            name="certType"
            options={Object.keys(certificationTypes)}
            handle={this.handleChange}
            // selected={this.state.certType}
          />
        </div>
        <div className="cell">
          <DateBox
            name="exp_date"
            handle={this.handleExpDate}
            selected={this.state.exp_date}
          />
        </div>
        <div className="cell">{this.props.signOffName}</div>
        <div className="cell">
          <DateBox
            name="signoff_date"
            handle={this.handleSignOffDate}
            selected={this.state.signoff_date}
          />
        </div>
        <div className="cell">
          <button
            name="save-btn"
            className="save-btn"
            onClick={this.handleClick}
          >
            Save
          </button>
          <button
            name="cancel-btn"
            className="cancel-btn"
            onClick={this.props.handleClick}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default AddCertification;
