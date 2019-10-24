import React from "react";
import ReportCard from "./ReportCard.jsx";
import CertificationView from "./certification/CertificationView.jsx";
import Select from "../elements/Select.jsx";
import axios from "axios";

class ReportCardView extends React.Component {
  constructor(props) {
    super(props);

    this.getVolunteers = this.getVolunteers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAllEditing = this.handleAllEditing.bind(this);
    this.getCertifications = this.getCertifications.bind(this);
    this.updatePerson = this.updatePerson.bind(this);

    this.state = {
      personInfo: {}, //volunteer info
      personNames: [], //volunteer names for select elements
      certifications: {}, //certification info
      currentPerson: "", //currently selected person
      currentId: props.match.params.id,
      signOffId: "",
      signOffName: "",
      loaded: false,
      allEditing: false
    };
  }

  componentDidMount() {
    this.getVolunteers();
  }

  getVolunteers() {
    const personNames = [];
    const personInfo = {};
    const currentCertifications = {};

    axios
      .get("/api/person/certifications")
      .then(response => {
        response.data.data.forEach(el => {
          //save each person's info
          const person = el.person;
          const name = person.first_name + " " + person.last_name;
          const certifications = el.certifications;

          personNames.push(name);
          personInfo[name] = person;

          if (person.id === this.state.currentId) {
            this.setState({ currentPerson: name });
          }

          //save each person's certifications
          currentCertifications[person.id] = certifications;
        });

        personNames.sort();

        this.setState({ personInfo: personInfo });
        this.setState({ personNames: personNames });

        if (this.state.currentPerson === "") {
          this.setState({ currentPerson: personNames[0] });
          this.setState({ currentId: personInfo[personNames[0]].id });
        }
        this.setState({ signOffName: personNames[0] });
        this.setState({ signOffId: personInfo[personNames[0]].id });
        this.setState({ certifications: currentCertifications, loaded: true });
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  updatePerson() {
    let currentCertifications = this.state.certifications;
    let personInfo = this.state.personInfo;

    axios
      .get(`/api/person/${this.state.currentId}`)
      .then(response => {
        const person = response.data.data.person;
        const name = person.first_name + " " + person.last_name;
        const certifications = response.data.data.certifications.reverse();

        currentCertifications[this.state.currentId] = certifications;
        personInfo[name] = person;

        this.setState({
          certifications: currentCertifications,
          personInfo: personInfo
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  getCertifications(id) {
    const currentCertifications = this.state.certifications;

    axios
      .get(`/api/person/${id}/certification`)
      .then(response => {
        const certifications = [];

        response.data.data.forEach(el => {
          const certification = el.certification;
          certifications.push(certification);
        });
        currentCertifications[id] = certifications;

        this.setState({ certifications: currentCertifications, loaded: true });
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  handleAllEditing(e) {
    this.setState({ allEditing: !this.state.allEditing });
  }

  handleChange(e) {
    const type = e.target.name;
    const name = e.target.value;
    const id = this.state.personInfo[name].id;

    //if volunteer is being selected
    if (type === "volunteer") {
      this.setState({ currentPerson: name });
      this.setState({ currentId: id });
      this.props.history.push(`/reportcard/${id}`);

      if (this.state.allEditing) {
        this.handleAllEditing();
      }
      //if sign off is being selected
    } else if (type === "sign-off") {
      this.setState({ signOffName: name });
      this.setState({ signOffId: id });
    }
  }

  render() {
    const {
      personInfo,
      certifications,
      currentPerson,
      currentId,
      loaded
    } = this.state;

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
          {/* <Select
            name="sign-off"
            label="Select sign off name"
            options={this.state.personNames}
            handle={this.handleChange}
            selected={this.state.signOffName}
            groupClass="rc-group"
            labelClass="rc-label"
            selectClass="rc-select"
          /> */}
          <ReportCard personInfo={personInfo[currentPerson]} />
          <CertificationView
            certifications={certifications[currentId]}
            personId={currentId}
            updatePerson={this.updatePerson}
            volunteers={personInfo}
            volunteerNames={this.state.personNames}
            allEditing={this.state.allEditing}
            handleAllEditing={this.handleAllEditing}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}
export default ReportCardView;
