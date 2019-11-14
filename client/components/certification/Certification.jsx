import React from "react";
import EditingCertification from "./EditingCertification.jsx";
import DefaultCertification from "./DefaultCertification.jsx";
import axios from "axios";

export default class Certification extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleExpDate = this.handleExpDate.bind(this);
    this.handleSignOffDate = this.handleSignOffDate.bind(this);
    this.updateCertification = this.updateCertification.bind(this);

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

  handleChange(e) {
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

    if (name === "edit-btn") {
      if (!editing) {
        this.setState({ editing: !editing });

        if (!this.props.data.expriation_date) {
          this.setState(prevState => ({
            newData: {
              ...prevState.newData,
              expriation_date: new Date().toISOString().split("T")[0]
            }
          }));
        }

        if (!this.props.data.signature_date) {
          this.setState(prevState => ({
            newData: {
              ...prevState.newData,
              signature_date: new Date().toISOString().split("T")[0]
            }
          }));
        }
        if (!this.props.data.signature_person_name) {
          this.setState(prevState => ({
            newData: {
              ...prevState.newData,
              signature_person_name: this.props.volunteerNames[0]
            }
          }));

          this.setState(prevState => ({
            newData: {
              ...prevState.newData,
              signature_person_id: this.props.volunteers[this.props.volunteerNames[0]].id
            }
          }));
        }
      }
    } else if (name === "save-btn") {
      this.updateCertification();
      this.setState({ editing: !editing });
    } else if (name === "cancel-btn") {
      this.setState({ newData: this.state.initialData });
      this.setState({ editing: !editing });
    }
  }

  render() {
    const { certificationTypes, volunteers, volunteerNames } = this.props;
    const { editing, initialData, newData } = this.state;

    return (
      <>
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
          <DefaultCertification
            data={initialData}
            handleClick={this.handleClick}
          />
        )}
      </>
    );
  }
}
