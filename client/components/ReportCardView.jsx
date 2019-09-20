import React from "react";
import ReportCard from "./ReportCard.jsx";
import CertificationView from "./certification/CertificationView.jsx";
import Select from "../elements/Select.jsx";
import axios from "axios";

//placeholder id
const routeId = "729c140b-2026-41e7-be84-c4b4828bb569";

class ReportCardView extends React.Component {
  constructor(props) {
    super(props);

    this.getVolunteers = this.getVolunteers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCertifications = this.getCertifications.bind(this);

    this.state = {
      personInfo: {}, //volunteer info
      personNames: [], //volunteer names for select elements
      certifications: {}, //certification info
      currentPerson: "", //currently selected person
      currentId: props.match.params.id,
      signOff: "",
      loaded: false,
    };
  }

  componentDidMount() {
    // if (this.props.match.params.id !== undefined) {
    //   this.setState({currentId:this.props.match.params.id})
    // }
    // else {
    this.setState({ currentId: routeId });
    //}
    this.getVolunteers();

    if (this.state.certifications[routeId] === undefined) {
      this.getCertifications(routeId);
    }
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

          if (el.id === this.state.currentId) {
            this.setState({ currentPerson: name });
          }
        });

        personNames.sort();

        this.setState({ personInfo: personInfo });
        this.setState({ personNames: personNames });

        if (this.state.currentPerson === "") {
          this.setState({ currentPerson: personNames[0] });
          this.setState({ currentId: personInfo[personNames[0]].id });
        }
        this.setState({ signOff: personNames[0]});
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

  handleChange(e) {
    e.preventDefault();

    const type = e.target.name;
    const name = e.target.value;
    const id = this.state.personInfo[name].id;

    //if volunteer is being selected
    if (type === "volunteer") {
      this.setState({ currentPerson: name });
      this.setState({ currentId: id });

      if (!this.state.certifications[id]) {
        this.setState({loaded : false})
        this.getCertifications(id);
      }
    //if sign off is being selected
    } else if (type === "sign-off") {
      this.setState({ signOff: name });
    }
  }

  render() {
    const { personInfo, certifications, currentPerson, currentId, loaded } = this.state;

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
          <ReportCard personInfo={personInfo[currentPerson]} />
          <CertificationView certification={certifications[currentId]}/>
        </div>
      );
    } else {
      return null;
    }
  }
}
export default ReportCardView;
