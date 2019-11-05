import React from "react";
import EditingCertification from "./EditingCertification.jsx";
import DefaultCertification from "./DefaultCertification.jsx";
import axios from "axios";

export default class Certification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      initialData: {
        expriation_date: "",
        id: "",
        name: "",
        signature_date: "",
        signature_person_id: "",
        signature_person_name: ""
      },
      newData: {
        expriation_date: "",
        id: "",
        name: "",
        signature_date: "",
        signature_person_id: "",
        signature_person_name: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleExpDate = this.handleExpDate.bind(this);
    this.handleSignOffDate = this.handleSignOffDate.bind(this);
    this.handleCertificationInfoChange = this.handleCertificationInfoChange.bind(
      this
    );
    this.updateCertification = this.updateCertification.bind(this);
  }

  componentDidMount() {
    this.setState({ initialData: this.props.data });
    this.setState({ newData: this.props.data });
  }

  updateCertification() {
    const updateData = {
      id: this.props.personId,
      certification_id: this.state.newData.id,
      expriation_date: this.state.newData.expriation_date,
      signature_date: this.state.newData.signature_date,
      signature_person_id: this.state.newData.signature_person_id
    };

    axios
      .put(
        `/api/person/${this.props.personId}/certification/${this.state.newData.id}`,
        updateData
      )
      .then(() => {
        this.setState({ initialData: this.state.newData });
        this.props.updatePerson();
        alert("Successfully updated certification :)");
      })
      .catch(error => {
        alert("Error updating certification :(");
        console.log("error", error);
      });
  }

  handleExpDate(e) {
    this.setState(prevState => ({
      newData: {
        ...prevState.newData,
        expriation_date: new Date(e).toISOString().split("T")[0]
      }
    }));
  }

  handleSignOffDate(e) {
    this.setState(prevState => ({
      newData: {
        ...prevState.newData,
        signature_date: new Date(e).toISOString().split("T")[0]
      }
    }));
  }

  handleCertificationInfoChange(e) {
    e.preventDefault();
    const name = e.target.name;
    let value = e.target.value;
    // if (name === "certification_name") {
    //   this.setState({name: e.target.value, id: e.target.id})
    // } else if (name === "expriation_date") {
    //   value = e.target.value;
    // } else {
    //   value = e.target.value
    // }

    console.log("ID", e.target.getAttribute("id"));
    this.setState({ [name]: value, id: e.target.id });
    console.log("CHANGED STATE", this.state);
    // this.setState({[name]: e.target.value})
  }

  handleChange(e) {
    e.preventDefault();

    const type = e.target.name;
    const name = e.target.value;
    let id = "";

    //if volunteer is being selected
    if (type === "certType") {
      id = this.props.certificationTypes[name];

      this.setState(prevState => ({
        newData: {
          ...prevState.newData,
          name: name
        }
      }));
      this.setState(prevState => ({
        newData: {
          ...prevState.newData,
          id: id
        }
      }));
      //if sign off is being selected
    } else if (type === "sign-off") {
      id = this.props.volunteers[name].id;

      this.setState(prevState => ({
        newData: {
          ...prevState.newData,
          signature_person_name: name
        }
      }));
      this.setState(prevState => ({
        newData: {
          ...prevState.newData,
          signature_person_id: id
        }
      }));
    }
  }

  handleClick(e) {
    const editing = this.state.editing;
    const name = e.target.name;

    if (name === "save-btn") {
      this.props.handleAllEditing();
      this.updateCertification();
    } else if (name === "edit-btn") {
      this.setState({ editing: !editing });
      if (!this.props.allEditing) {
        this.props.handleAllEditing();
      }
    } else if (name === "cancel-btn") {
      this.setState({ newData: this.state.initialData });
      this.setState({ editing: !editing });
      if (this.props.allEditing) {
        this.props.handleAllEditing();
      }
    }
  }

  render() {
    const { certificationTypes, volunteers, volunteerNames } = this.props;
    const { editing, newData } = this.state;

    return (
      <React.Fragment>
        {editing ? (
          <EditingCertification
            data={newData}
            certificationTypes={certificationTypes}
            handleExpDate={this.handleExpDate}
            handleSignOffDate={this.handleSignOffDate}
            volunteerNames={volunteerNames}
            handleChange={this.handleChange}
            handleClick={this.handleClick}
          />
        ) : (
          <DefaultCertification data={newData} handleClick={this.handleClick} />
        )}
      </React.Fragment>
    );
  }
}
