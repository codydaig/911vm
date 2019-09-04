import React from "react";
import ReportCard from "./ReportCard.jsx";
import Select from "../elements/Select.jsx";
import axios from "axios";

//placeholder id
const id = "54ddf0c0-b342-4caa-b9dd-04870c55ffc9";

class ReportCardView extends React.Component {
  constructor() {
    super();

    this.getVolunteers = this.getVolunteers.bind(this);
    this.getCertifications = this.getCertifications.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      personInfo: {},
      personNames: [],
      certifications: {},
      currentPerson: "",
      signOff: "",
      loaded: false
    };
  }

  componentDidMount() {
    this.getVolunteers();
  }

  getVolunteers() {
    const personNames = [];
    const personInfo = {};

    axios
      .get("/api/person")
      .then(response => {
        response.data.data.forEach(el => {
          const name = el.first_name + " " + el.last_name;
          personNames.push(name);
          personInfo[name] = el;
        });
        personNames.sort();
        this.setState({ personInfo : personInfo });
        this.setState({ personNames : personNames });
        this.setState({ currentPerson : personNames[0] });
        this.setState({ signOff : personNames[0] });
        this.getCertifications(this.state.currentPerson);
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  getCertifications(currentPerson) {
    console.log(this.state.personInfo[currentPerson].id)
    const id = this.state.personInfo[currentPerson].id;
    const currentCertifications = this.state.certifications;

    axios
      .get(`/api/person/${id}/certification`)
      .then(response => {
        const certifications = [];
        response.data.data.forEach(el => {
          const certification = el.certification;
          certifications.push(certification);
        });
        currentCertifications[currentPerson] = certifications
        this.setState({ certifications : currentCertifications, loaded : true });
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    
    //if volunteer is being selected
    if (name === "volunteer") {
      this.setState(this.setState({ currentPerson: value }));
      this.getCertifications(this.state.currentPerson);
    //if sign off is being selected
    } else if (name === "sign-off") {
      this.setState(this.setState({ signOff: value }));
    }
  }

  render() {
    const { personInfo, loaded } = this.state;
    // const { personInfo, certifications, loaded } = this.state;
    if (loaded) {
      return (
        <div>
          <Select
            name="volunteer"
            label="Select volunteer"
            options={this.state.personNames}
            handle={this.handleChange}
            selected={this.state.currentPerson}
            groupClass="rc-group"
            labelClass="rc-label"
            selectClass="rc-select"
          />
          <Select
            name="sign-off"
            label="Select sign off name"
            options={this.state.personNames}
            handle={this.handleChange}
            selected={this.state.signOff}
            groupClass="rc-group"
            labelClass="rc-label"
            selectClass="rc-select"
          />
          <ReportCard personInfo={this.state.personInfo[this.state.currentPerson]} />
        </div>
      );
    }
    else {
        return null;
    }
  }
}
export default ReportCardView;
