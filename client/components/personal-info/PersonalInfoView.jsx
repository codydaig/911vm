import React from "react";
import moment from "moment";
import axios from "axios";
import DefaultPersonalInfo from "./DefaultPersonalInfo.jsx";
import EditingPersonalInfo from "./EditingPersonalInfo.jsx";

class PersonalInfoView extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.updatePersonInfo = this.updatePersonInfo.bind(this);

    this.state = {
      editing: false,
      initialData: {},
      newData: {}
    };
  }

  componentDidMount() {
    let data = this.props.personInfo;
    if (!data.phone_number) {
      data.phone_number = "";
    }
    this.setState({ initialData: data });
    this.setState({ newData: data });
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.personInfo) !==
      JSON.stringify(this.props.personInfo)
    ) {
      this.setState({ initialData: this.props.personInfo });
      this.setState({ newData: this.props.personInfo });
    }
  }

  handleStartDate(e) {
    this.setState(prevState => ({
      newData: {
        ...prevState.newData,
        start_date: new Date(e).toISOString().split("T")[0]
      }
    }));
  }

  handleClick(e) {
    const editing = this.state.editing;
    const name = e.target.name;

    if (name === "edit-btn") {
      if (!editing) {
        this.setState({ editing: !editing });
      }
    } else if (name === "save-btn") {
      if (
        this.state.newData.phone_number === null ||
        this.state.newData.phone_number.length !== 9
      ) {
        alert("Invalid phone number.");
      } else {
        this.updatePersonInfo();
        this.setState({ editing: !editing });
      }
    } else if (name === "cancel-btn") {
      this.setState({ editing: !editing });
    }
  }

  handleChange(e) {
    const type = e.target.name;
    let value = e.target.value;

    //if first name is being changed
    if (type === "first_name") {
      this.setState(prevState => ({
        newData: {
          ...prevState.newData,
          [type]: value
        }
      }));
      //if last name is being changed
    } else if (type === "last_name") {
      this.setState(prevState => ({
        newData: {
          ...prevState.newData,
          [type]: value
        }
      }));
      //if email is being changed
    } else if (type === "email_address") {
      this.setState(prevState => ({
        newData: {
          ...prevState.newData,
          [type]: value
        }
      }));
      //if phone is being changed
    } else if (type === "phone_number") {
      value = value.replace(/\D/g, "");

      this.setState(prevState => ({
        newData: {
          ...prevState.newData,
          [type]: value
        }
      }));
    }
  }

  updatePersonInfo() {
    const updateData = {
      id: this.props.personId,
      certification_id: this.state.newData.id,
      expriation_date: this.state.newData.expriation_date,
      signature_date: this.state.newData.signature_date,
      signature_person_id: this.state.newData.signature_person_id
    };

    axios
      .put(`/api/person/${this.props.personInfo.id}`, this.state.newData)
      .then(() => {
        this.setState({ initialData: this.state.newData });
        this.props.updatePerson();
        alert("Successfully updated volunteer info :)");
      })
      .catch(error => {
        alert("Error updating volunteer info :(");
        console.log("error", error);
      });
  }

  render() {
    const { personInfo } = this.props;

    return (
      <div className="personal-info">
        <div className="personal-info-header">
          <h1>
            {personInfo.first_name} {personInfo.last_name}
          </h1>
        </div>
        <div className="cell">
          <h3>First Name</h3>
        </div>
        <div className="cell">
          <h3>Last Name</h3>
        </div>
        <div className="cell">
          <h3>Email</h3>
        </div>
        <div className="cell">
          <h3>Phone Number</h3>
        </div>
        <div className="cell">
          <h3>Class</h3>
        </div>
        <div className="cell">
          <h3>Start Date</h3>
        </div>
        <div className="cell">
          <h3>Actions</h3>
        </div>
        {this.state.editing ? (
          <EditingPersonalInfo
            personInfo={this.state.newData}
            onChange={this.handlePersonalInfoChange}
            handleClick={this.handleClick}
            handleChange={this.handleChange}
            handleStartDate={this.handleStartDate}
          />
        ) : (
          <DefaultPersonalInfo
            personInfo={personInfo}
            handleClick={this.handleClick}
          />
        )}
      </div>
    );
  }
}

export default PersonalInfoView;
