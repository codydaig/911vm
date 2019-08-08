import React from 'react';
import moment from 'moment';
import Certification from './Certification.jsx';

// @Karin Hsu i have few endpoints you can play with.  GET /api/person,  GET /api/person/:id,  GET /api/person/:id/certification

const EditingInfoCard = ({editing, personInfo, personData, unixConverter}) => {
  return (
    <div>
      <div className="personal-info">
        <h1>{personInfo.first_name} {personInfo.last_name}</h1>
        <form >
          <p>Email:
            <input type="text" name="email" placeholder={personInfo.email_address}/>
          </p>
          <p>#:
            <input type="text" name="phone_number" minLength="10" maxLength="10" placeholder={personInfo.phone_number}/>
          </p>
          <p>Admin:
            <select defaultValue={personInfo.is_admin ? "true" : "false"} id="admin">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </p>
          <p>Volunteer:
            <select defaultValue={personInfo.is_volunteer ? "true" : "false"} id="volunteer">
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
    }
    this.handleClick = this.handleClick.bind(this);
    this.unixConverter = this.unixConverter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  unixConverter(unix) {
    const time = moment(unix).format("MM/DD/YYYY");
    return time;
  }

  handleClick() {
    const editingValue = !this.state.editing;
    this.setState({editing: editingValue})
  }

  handleChange(e) {
    // sets new value in DB
    console.log('DB value updated')
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
            unixConverter={this.unixConverter}/> 
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
      </div>
    )
  }
}