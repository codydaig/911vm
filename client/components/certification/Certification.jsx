import React from "react";
import EditingCertification from './EditingCertification.jsx';
import DefaultCertification from './DefaultCertification.jsx';
import axios from "axios";

export default class Certification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing : false
    };
    this.handleClick = this.handleClick.bind(this);

    this.handleCertificationInfoChange = this.handleCertificationInfoChange.bind(this);
  }

  componentDidMount() {
    // axios.get("/api/certification")
    //   .then(response => {
    //     this.setState({
    //       certificationTypes: response.data.data
    //     })
    //   })
    //   .catch(error => {
    //     console.log("error", error);
    //   });
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

  handleClick() {
    const editingValue = !this.state.editing;
    this.setState({ editing: editingValue });
  }

  render() {
    const { data, certificationTypes} = this.props;
    const { editing } = this.state;

    return (
      <div className="certifications">
        {editing ? (
          <EditingCertification
            data={data}
            // handleChange={handleChange}
            certificationTypes={certificationTypes}
            onChange={this.handleCertificationInfoChange}
            onClick={this.handleClick}
          />
        ) : (
          <DefaultCertification 
            data={data} 
            onClick={this.handleClick} 
          />
        )}
      </div>
    );
  }
}
