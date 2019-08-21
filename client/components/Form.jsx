import React from "react";
import Input from "./Input.jsx";
import Email from "./Email.jsx";
import Select from "./Select.jsx";
import Checkbox from "./Checkbox.jsx";
import DateBox from "./DateBox.jsx";
import SubmitButton from "./SubmitButton.jsx";
import axios from "axios";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.handleFirst = this.handleFirst.bind(this);
    this.handleLast = this.handleLast.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleClass = this.handleClass.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      newVolunteer: {
        first_name: "",
        last_name: "",
        email_address: "",
        phone_number: "",
        class: "Probationary",
        start_date: 0,
        end_date: 0,
        is_admin: false,
        is_volunteer: false
      },
      classes: ["Probationary", "Trainee", "Apprentice", "General"],
      startDate: new Date()
    };
  }
  componentDidMount () {
    this.handleStart(new Date())
  }

  handleFirst(e) {
    let value = e.target.value;

    this.setState(prevState => ({
      newVolunteer: { ...prevState.newVolunteer, first_name: value }
    }));
  }

  handleLast(e) {
    let value = e.target.value;

    this.setState(prevState => ({
      newVolunteer: { ...prevState.newVolunteer, last_name: value }
    }));
  }

  handleEmail(e) {
    let value = e.target.value;

    this.setState(prevState => ({
      newVolunteer: { ...prevState.newVolunteer, email_address: value }
    }));
  }

  handlePhone(e) {
    let currentPhone = this.state.newVolunteer.phone_number;

    let value = e.target.value;
    value = value.replace(/\D/g,'');

    if (currentPhone.length < 10) {
      this.setState(prevState => ({
        newVolunteer: { ...prevState.newVolunteer, phone_number: value }
      }));
    }
  }

  handleClass(e) {
    let value = e.target.value;

    this.setState(prevState => ({
      newVolunteer: { ...prevState.newVolunteer, class: value }
    }));
  }

  handleStatus(e) {
    let value = e.target.value;

    //switch on/off admin and volunteer status
    if (value === "Administrator") {
      this.setState(prevState => ({
        newVolunteer: {
          ...prevState.newVolunteer,
          is_admin: !this.state.newVolunteer.is_admin
        }
      }));
    } else if (value === "Volunteer") {
      this.setState(prevState => ({
        newVolunteer: {
          ...prevState.newVolunteer,
          is_volunteer: !this.state.newVolunteer.is_volunteer
        }
      }));
    }
  }

  handleStart(date) {
    //set start date
    this.setState({
      startDate: date
    });

    //set milliseconds in volunteer object
    this.setState(prevState => ({
      newVolunteer: {
        ...prevState.newVolunteer,
        start_date: this.state.startDate.getTime()
      }
    }));
    console.log(this.state.newVolunteer.start_date)
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newVolunteer;
    console.log("submit");
    console.log(userData);

    axios
      .post(`/api/person`, userData)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <form className="volunteerForm" onSubmit={this.handleFormSubmit}>
        <Input
          name={"first-name"}
          label={"First name"}
          handle={this.handleFirst}
        />
        <Input
          name={"last-name"}
          label={"Last name"}
          handle={this.handleLast}
        />
        <Email handleEmail={this.handleEmail} />
        <Input
          name={"phone-number"}
          label={"Phone number"}
          handle={this.handlePhone}
          value={this.state.newVolunteer.phone_number}
        />
        <Select
          name={"class-type"}
          label={"Select class"}
          options={this.state.classes}
          handle={this.handleClass}
        />
        <Checkbox
          name={"checkbox"}
          title={"Administrator"}
          option={"Administrator"}
          handle={this.handleStatus}
        />
        <Checkbox
          name={"checkbox"}
          title={"Volunteer"}
          option={"Volunteer"}
          handle={this.handleStatus}
        />
        <DateBox
          label={"Start date"}
          handleDate={this.handleStart}
          selected={this.state.startDate}
        />
        <SubmitButton onSubmit={this.handleFormSubmit} />
      </form>
    );
  }
}

export default Form;
