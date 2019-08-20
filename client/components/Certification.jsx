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

const EditingCard = ({data, unixConverter, handleChange, certificationTypes}) => {
  console.log(certificationTypes)
  return (
    <div>
      <p>Name:
        <select defaultValue={data.certification.id} placeholder={data.certification.name} id="certification_name">
          {certificationTypes.map((cert, i) => {
            return <option value={cert.id} key={i}>{cert.name}</option>
          })}
        </select>
      </p>
      <p>Expires: 
        <input type="text" id="expires" placeholder={unixConverter(data.certification.expriation_date) ? unixConverter(data.certification.expriation_date) : "undefined"}/>
      </p>
      <p>Sign Off: 
        <input type="text" id="sign-off" placeholder={unixConverter(data.certification.sign_off.signature_date) ? unixConverter(data.certification.sign_off.signature_date) : "undefined"} />
      </p>
  </div>
  )
}

export default class Certification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      expriation_date: '', 
      sign_off: '',
      certificationTypes: [],
    }
  }

  componentDidMount() {
    axios.get('/api/certification')
      .then(response => {
        this.setState({
          certificationTypes: response.data.data,
        })
      .catch(error => {
        console.log("error", error);
      });
    });
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
          certificationTypes={certificationTypes}/> : 
        <DefaultCertificationCard 
          data={data} 
          unixConverter={unixConverter}/>
      }
      </div>
    )
  }
}
