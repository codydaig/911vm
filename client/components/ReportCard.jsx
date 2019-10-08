import React from 'react';
import moment from 'moment';
import Certification from './Certification.jsx';
import axios from 'axios';

// @Karin Hsu i have few endpoints you can play with.  GET /api/person,  GET /api/person/:id,  GET /api/person/:id/certification

const EditingPersonalInfoCard = ({personInfo, onChange}) => {
  return (
    <div>
      <div className="personal-info">
        <h1>{personInfo.first_name} {personInfo.last_name}</h1>
        <form>
          <p>Email:
            <input type="text" placeholder={personInfo.email_address} id="email_address" onChange={onChange}/>
          </p>
          <p>#:
            <input type="text" minLength="10" maxLength="10" placeholder={personInfo.phone_number} id="phone_number" onChange={onChange}/>
          </p>
          <p>Admin:
            <select defaultValue={personInfo.is_admin ? "true" : "false"} id="is_admin" onChange={onChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </p>
          <p>Volunteer:
            <select defaultValue={personInfo.is_volunteer ? "true" : "false"} id="is_volunteer" onChange={onChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </p>
        </form>
      </div>
    </div>
  )
}

const DefaultPersonalInfoCard = ({personInfo, email_address, phone_number, is_admin, is_volunteer}) => {
  return (
    <div>
      <div className="personal-info">
        <h1>{personInfo.first_name} {personInfo.last_name}</h1>
        <p>Email: {email_address}</p>
        <p>#: {phone_number}</p>
        <p>Admin: {is_admin ? "Yes" : "No"}</p>
        <p>Volunteer: {is_volunteer ? "Yes" : "No"}</p>
      </div>
    </div>
  )
}

export default class ReportCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      email_address: '',
      phone_number: '',
      is_admin: '',
      is_volunteer: '',
      certifications: [],
      loaded: false,
      id: props.match.params.id // get the ID from the
    }
    this.handleClick = this.handleClick.bind(this);
    this.unixConverter = this.unixConverter.bind(this);
    this.handlePersonalInfoChange = this.handlePersonalInfoChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.createCertification = this.createCertification.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/person/${this.state.id}`)
      .then((response) => {
        this.setState({
          personInfo: response.data.data,
          email_address: response.data.data.email_address,
          phone_number: response.data.data.phone_number,
          is_admin: response.data.data.is_admin,
          is_volunteer: response.data.data.is_volunteer
        })
        return axios.get(`/api/person/${this.state.id}/certification`)
      }) 
      .then((response) => {
        this.setState({
          editing: false, 
          certifications: response.data.data,
          loaded: true
        });
      })
      .catch((error) => {
        console.log("error", error)
      });
  }

  unixConverter(unix) {
    const time = moment(unix).format("MM/DD/YYYY");
    return time;
  }
  
  handleClick() {
    const editingValue = !this.state.editing;
    this.setState({editing: editingValue})
  }

  handleSaveClick(e, saveAlteredCertifications) {
    e.preventDefault();
    // save to DB
    const {email_address, phone_number, is_admin, is_volunteer} = this.state;
    const isEditing = !this.state.editing;
    const updatedInfo = {
      email_address, 
      phone_number, 
      is_admin,
      is_volunteer
    };

    this.setState({editing: isEditing});
    alert("saved to db" + JSON.stringify(updatedInfo));
    // axios.put(`/api/person/${id}`, updatedInfo)
    //   .then(response => {
    //     console.log(response)
    //   })
    //   .catch(error => {
    //     console.log("error", error)
    //   })
  }
  
  handlePersonalInfoChange(event) {
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

  createCertification() {
    const createdCert = {certification : {name: "tbd", id: "tbd", expriation_date: "tbd", sign_off: {signature_date: null, id: null}}};
    this.setState({certifications: [...this.state.certifications, createdCert]})
  }
  
  render() {
    // const { personInfo } = this.props;
    const { editing, email_address, phone_number, is_admin, is_volunteer, certifications, personInfo } = this.state;

    if(!this.state.loaded) {
      return ( <div>Loading.....</div>)
    }
      
    return (
      <div> 
        {
          editing ? 
          <EditingPersonalInfoCard 
            personInfo={personInfo} 
            onChange={this.handlePersonalInfoChange}/> 
          : 
          <DefaultPersonalInfoCard
            personInfo={personInfo}
            email_address={email_address}
            phone_number={phone_number}
            is_admin={is_admin}
            is_volunteer={is_volunteer}/>
        }
        <div className="certifications-container">
          <h3>Certifications:</h3>
          { certifications.length !== 0 && 
            certifications.map((data, i) => {
              return (
                <div className="certifications" key={i}>
                  <Certification 
                    data={data} 
                    unixConverter={this.unixConverter} 
                    editing={editing}/>
                </div>
              )
            })
          }
        </div>

        { editing? 
          <div>
            <button className="edit-certification" onClick={this.handleClick}>
              Editing
            </button>
            <button className="save-btn" onClick={this.handleSaveClick}>
              Save
            </button>
          </div>
        : 
          <div>
            <button className="edit-certification" onClick={this.handleClick}>
              Edit
            </button>
            <button className="create-certification" onClick={this.createCertification}>
              Add Certification
            </button>
          </div>
        }
      </div>
    )
  }
}