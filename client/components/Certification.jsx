import React from 'react';
import { unix } from 'moment';
// import DatePicker from 'react-date-picker';
import axios from 'axios';

const DefaultCertificationCard = ({data, unixConverter}) => {
  return (
    <div>
        <p>Name: {data.certification.name}</p>
        <p>Expires: {JSON.stringify(unixConverter(data.certification.expriation_date))}</p>
        <p>Sign Off: {JSON.stringify(unixConverter(data.certification.sign_off.signature_date))}</p>
      </div>
  )
}

const EditingCard = ({data, unixConverter, handleChange, certificationTypes, onChange}) => {
  return (
    <div>
      <p>Name:
        <select defaultValue={data.certification.id} name="certification_name" onChange={onChange}>
          {certificationTypes.map((cert, i) => {
            console.log("cert", cert)
            return <option name={cert.name} data-id={cert.id} key={i}>{cert.name}</option>
          })}
        </select>
      </p>
      <p>Expires: 
        <input type="text" name="expriation_date" placeholder={unixConverter(data.certification.expriation_date) ? unixConverter(data.certification.expriation_date) : "undefined"}/>
      </p>
      <p>Sign Off: 
        <input type="text" name="sign_off" placeholder={unixConverter(data.certification.sign_off.signature_date) ? unixConverter(data.certification.sign_off.signature_date) : "undefined"} />
      </p>
  </div>
  )
}

export default class Certification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      id: '',
      expriation_date: '', 
      sign_off: '',
      certificationTypes: [],
    }
    this.handleCertificationInfoChange = this.handleCertificationInfoChange.bind(this);
  }

  componentDidMount() {
    axios.get('/api/certification')
      .then(response => {
        this.setState({
          certificationTypes: response.data.data,
        })
      })
      .catch(error => {
        console.log("error", error);
      });
    
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

    console.log("ID", e.target.getAttribute('id'))
    this.setState({[name]: value, id: e.target.id})
    console.log("CHANGED STATE", this.state)
    // this.setState({[name]: e.target.value})

  }

  render() {
    const { data, unixConverter, editing, handleChange } = this.props;
    const { expriation_date, sign_off, certificationTypes } = this.state; 
    return (
      <div>
      { 
        editing ? 
        <EditingCard 
          data={data} 
          unixConverter={unixConverter} 
          handleChange={handleChange}
          certificationTypes={certificationTypes}
          onChange={this.handleCertificationInfoChange}/> : 
        <DefaultCertificationCard 
          data={data} 
          unixConverter={unixConverter}/>
      }
      </div>
    )
  }
}
