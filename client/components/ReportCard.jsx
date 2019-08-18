import React from 'react';
import moment from 'moment';
import Certification from './Certification.jsx';
import axios from 'axios';

// @Karin Hsu i have few endpoints you can play with.  GET /api/person,  GET /api/person/:id,  GET /api/person/:id/certification

const EditingInfoCard = ({editing, personInfo, personData, unixConverter, onChange}) => {
  return (
    <div>
      <div className="personal-info">
        <h1>{personInfo.first_name} {personInfo.last_name}</h1>
        <form >
          <p>Email:
            <input type="text" placeholder={personInfo.email_address} id="email" onChange={onChange}/>
          </p>
          <p>#:
            <input type="text" minLength="10" maxLength="10" placeholder={personInfo.phone_number} id="phone_number" onChange={onChange}/>
          </p>
          <p>Admin:
            <select defaultValue={personInfo.is_admin ? "true" : "false"} id="admin" onChange={onChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </p>
          <p>Volunteer:
            <select defaultValue={personInfo.is_volunteer ? "true" : "false"} id="volunteer" onChange={onChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </p>
        </form>
      </div>
    
      <div className="certifications-container">
        <h3>Certifications:</h3>
        {personData.data.map((person, i) => {
          return (
            <div className="certifications" key={i}>
              <Certification person={person} unixConverter={unixConverter} editing={editing}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default class ReportCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      email: '',
      phone_number: '',
      admin: '',
      volunteer: '',
      
    }
    this.handleClick = this.handleClick.bind(this);
    this.unixConverter = this.unixConverter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }
  
  componentDidMount() {
    const {email_address, phone_number, is_admin, is_volunteer } = this.props.personInfo; 
    this.setState({
      editing: false,
      email: email_address,
      phone_number: phone_number, 
      admin: is_admin,
      volunteer: is_volunteer
    })
  }
  unixConverter(unix) {
    const time = moment(unix).format("MM/DD/YYYY");
    return time;
  }
  
  handleClick() {
    const editingValue = !this.state.editing;
    this.setState({editing: editingValue})
  }

  handleSaveClick(event) {
    event.preventDefault();
    // save to DB
    const isEditing = !this.state.editing;
    this.setState({editing: isEditing});
    const updatedInfo = this.state;
    alert("saved to db" + JSON.stringify(updatedInfo));
    // axios.put('/api/person/ae503518-d157-4bfb-b5b0-6ad9af547d3e', updatedInfo)
    //   .then(response => {
    //     console.log(response)
    //   })
    //   .catch(error => {
    //     console.log("error", error)
    //   })
  }
  
  handleChange(event) {
    // sets new value in DB
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
    const { personInfo, personData } = this.props;
    const { editing } = this.state;
    return (
      <div> 
        {
          editing ? 
          <EditingInfoCard 
            editing={editing} 
            personInfo={personInfo} 
            personData={personData} 
            unixConverter={this.unixConverter}
            onChange={this.handleChange}/> 
          : 
          <div>
            <div className="personal-info">
              <h1>{personInfo.first_name} {personInfo.last_name}</h1>
              <p>Email: {personInfo.email_address}</p>
              <p>#: {personInfo.phone_number}</p>
              <p>Admin: {personInfo.is_admin ? "Yes" : "No"}</p>
              <p>Volunteer: {personInfo.is_volunteer ? "Yes" : "No"}</p>
            </div>
          
          <div className="certifications-container">
            <h3>Certifications:</h3>
            {
              personData.data.map((person, i) => {
                return (
                  <div className="certifications" key={i}>
                    <Certification person={person} unixConverter={this.unixConverter} editing={editing}/>
                  </div>
                )
              })
            }
          </div>
          </div>
        }
        <button className="edit-certification" onClick={this.handleClick}>
          {editing ? "Editing" : "Edit"}
        </button>
        {editing && 
          <button className="save-btn" onClick={this.handleSaveClick}>
            Save
          </button>
        }
      </div>
    )
  }
}