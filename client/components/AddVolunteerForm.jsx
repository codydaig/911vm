import React from "react";
import Input from "../elements/Input.jsx";
import Select from "../elements/Select.jsx";
import Checkbox from "../elements/Checkbox.jsx";
import DateBox from "./DateBox.jsx";
import SubmitButton from "../elements/SubmitButton.jsx";
import axios from "axios";

class AddVolunteerForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.reset = this.reset.bind(this);

    this.state = {
      newVolunteer: {
        first_name: "",
        last_name: "",
        email_address: "",
        phone_number: "",
        class: "Probationary",
        start_date: new Date(),
        end_date: 0,
        is_admin: false,
        is_volunteer: false
      },
      classes: ["Probationary", "Trainee", "Apprentice", "General"],
      initialVolunteer: {} //intial form for reset
    };
  }

  componentDidMount() {
    this.setState({ initialVolunteer: this.state.newVolunteer });
  }

  reset(e) {
    e.preventDefault();
    this.props.handleClose();
    this.setState({ newVolunteer: this.state.initialVolunteer });
  }

  handleChange(e) {
    //if date is being changed
    if (e instanceof Date) {
      //set date in milliseconds in volunteer object
      this.setState(prevState => ({
        newVolunteer: {
          ...prevState.newVolunteer,
          start_date: e.getTime()
        }
      }));
      //if other info is being added
    } else {
      let value = e.target.value;
      let property = e.target.name;

      //if class is being selected
      if (property === "is_admin" || property === "is_volunteer") {
        this.setState(prevState => ({
          newVolunteer: {
            ...prevState.newVolunteer,
            [property]: !this.state.newVolunteer[property]
          }
        }));
        //if phone number is being added
      } else if (property === "phone_number") {
        let currentPhone = this.state.newVolunteer.phone_number;

        value = value.replace(/\D/g, "");

        if (currentPhone.length < 10) {
          this.setState(prevState => ({
            newVolunteer: { ...prevState.newVolunteer, [property]: value }
          }));
        }
        //if other info is being added
      } else {
        this.setState(prevState => ({
          newVolunteer: { ...prevState.newVolunteer, [property]: value }
        }));
      }
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newVolunteer;

    axios
      .post(`/api/person`, userData)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  render() {
    const showHideClassName = this.props.show
      ? "form-bg visible"
      : "form-bg not-visible";
    return (
      <div className={showHideClassName}>
        <form className={"volunteerForm"} onSubmit={this.handleFormSubmit}>
          <Input
            name="first_name"
            label="First name"
            handle={this.handleChange}
            value={this.state.newVolunteer.first_name}
            groupClass="form-group"
            labelClass="form-label"
            inputClass="form-select"
          />
          <Input
            name="last_name"
            label="Last name"
            handle={this.handleChange}
            value={this.state.newVolunteer.last_name}
            groupClass="form-group"
            labelClass="form-label"
            inputClass="form-select"
          />
          <Input
            name="email_address"
            label="Email"
            handle={this.handleChange}
            value={this.state.newVolunteer.email_address}
            groupClass="form-group"
            labelClass="form-label"
            inputClass="form-select"
          />
          <Input
            name="phone_number"
            label="Phone number"
            handle={this.handleChange}
            value={this.state.newVolunteer.phone_number}
            groupClass="form-group"
            labelClass="form-label"
            inputClass="form-select"
          />
          <Select
            name="class"
            label="Select class"
            options={this.state.classes}
            handle={this.handleChange}
            selected={this.state.newVolunteer.class}
            groupClass="form-group"
            labelClass="form-label"
            selectClass="form-select"
          />
          <Checkbox
            name="is_admin"
            title="Administrator"
            option="Administrator"
            handle={this.handleChange}
            checked={this.state.newVolunteer.is_admin}
            groupClass="form-group"
            labelClass="form-label"
            checkboxClass="form-select"
          />
          <Checkbox
            name="is_volunteer"
            title="Volunteer"
            option="Volunteer"
            handle={this.handleChange}
            checked={this.state.newVolunteer.is_volunteer}
            groupClass="form-group"
            labelClass="form-label"
            checkboxClass="form-checkbox"
          />
          <DateBox
            name="start_date"
            label="Start date"
            handle={this.handleChange}
            selected={new Date(this.state.newVolunteer.start_date)}
            groupClass="form-group"
            labelClass="form-label"
          />
          <SubmitButton
            onSubmit={this.handleFormSubmit}
            groupClass="form-group"
            submitClass="form-submit"
          />
          <button onClick={this.reset}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default AddVolunteerForm;
