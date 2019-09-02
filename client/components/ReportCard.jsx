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
        </form>
      </div>
    </div>
  )
}

const DefaultPersonalInfoCard = ({personInfo}) => {
  return (
    <div>
      <div className="personal-info">
        <h1>{personInfo.first_name} {personInfo.last_name}</h1>
        <p>Email: {personInfo.email_address}</p>
        <p>#: {personInfo.phone_number}</p>
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
      certifications: [],
    }
    this.handleClick = this.handleClick.bind(this);
    this.unixConverter = this.unixConverter.bind(this);
    this.handlePersonalInfoChange = this.handlePersonalInfoChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.createCertification = this.createCertification.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/person/${this.props.personInfo.id}/certification`)
      .then((response) => {
        console.log("certification test", response)
        this.setState({
          editing: false,
          email_address,
          phone_number,
          certifications: response.data.data,
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
    const {email_address, phone_number} = this.state;
    const isEditing = !this.state.editing;
    const updatedInfo = {
      email_address, 
      phone_number
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
    const { personInfo } = this.props;
    const { editing, email_address, phone_number, certifications } = this.state;
      
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
            // email_address={email_address}
            // phone_number={phone_number}
          />
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
        <button onClick = {this.props.backToOverview}>Back</button>
      </div>
    )
  }
}