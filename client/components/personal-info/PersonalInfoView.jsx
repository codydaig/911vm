import React from "react";
import moment from "moment";
import axios from "axios";
import DefaultPersonalInfo from "./DefaultPersonalInfo.jsx";
import EditingPersonalInfo from "./EditingPersonalInfo.jsx";

class PersonalInfoView extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      editing: false,
      email_address: "",
      phone_number: "",
      is_admin: "",
      is_volunteer: "",
      certifications: [],
      volunteerNames: [],
      volunteerInfo: {},
      currentVolunteer: {}
    };
    // this.handleClick = this.handleClick.bind(this);
    this.handlePersonalInfoChange = this.handlePersonalInfoChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.createCertification = this.createCertification.bind(this);
  }

  handleSaveClick(e, saveAlteredCertifications) {
    e.preventDefault();
    // save to DB
    const { email_address, phone_number, is_admin, is_volunteer } = this.state;
    const isEditing = !this.state.editing;
    const updatedInfo = {
      email_address,
      phone_number,
      is_admin,
      is_volunteer
    };

    this.setState({ editing: isEditing });
    alert("saved to db" + JSON.stringify(updatedInfo));
    // axios.put(`/api/person/${id}`, updatedInfo)
    //   .then(response => {
    //     console.log(response)
    //   })
    //   .catch(error => {
    //     console.log("error", error)
    //   })
  }

  handlePersonalInfoChange(event) {
    event.preventDefault();
    const id = event.target.id;
    let value; 
    if (id === "admin" || id === "volunteer") {
      value = (event.target.value == "true")
    } else {
      value = event.target.value
    }
    this.setState({[id]: value});
  }

  render() {
    const { personInfo } = this.props;

    return (
      <div>
        {editing ? (
          <EditingPersonalInfo
            personInfo={personInfo}
            onChange={this.handlePersonalInfoChange}
          />
        ) : (
          <DefaultPersonalInfo
            personInfo={personInfo}
          />
        )}
      </div>
    );
  }
}

export default PersonalInfoView;
