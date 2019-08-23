import React from 'react';
import { unix } from 'moment';

{/*  expiration_date is mispelled. not sure if this is only in the mock data or if in DB */}
const DefaultCertificationCard = ({person, unixConverter}) => {
  return (
    <div>
        <p>Name: {person.certification.name}</p>
        <p>Expires: {JSON.stringify(unixConverter(person.certification.expriation_date))}</p>
        <p>Sign Off: {JSON.stringify(unixConverter(person.certification.sign_off.signature_date))}</p>
      </div>
  )
}

const EditingCard = ({person, unixConverter, handleChange}) => {
  return (
    <div>
      <p>Name: {person.certification.name}</p>
      <form >
      <p>Expires: 
        <input type="text" id="expires" placeholder={unixConverter(person.certification.expriation_date)}/>
      </p>
      <p>Sign Off: 
        <input type="text" id="sign-off" placeholder={unixConverter(person.certification.sign_off.signature_date)} />
      </p>
      </form>
  </div>
  )
}

export default class Certification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    }
  }

  render() {
    const { person, unixConverter, editing, handleChange } = this.props;
    return (
      <div>
      { 
        editing ? <EditingCard person={person} unixConverter={unixConverter} handleChange={handleChange}/> : <DefaultCertificationCard person={person} unixConverter={unixConverter}/>
      }
      </div>
    )


  }
}
