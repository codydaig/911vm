import React, {useState, useEffect} from 'react';
import apis from './../apis'

const Volunteer = (props) => {
  const id = props.match.params.id
  const [personInfo, setPersonInfo] = useState({});
  const [certifications, setCertifications] = useState([]);

  const getVolunteer = () => {    
    apis.getVolunteer(id)
    .then((res) => {
      const data = res.data.data;
      setPersonInfo(data.person);
      setCertifications(data.certifications);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getVolunteer();
  }, [id])  

  return (
    <div>
      <h2>{personInfo.first_name}</h2>
      <p>Certifications: {certifications.length}</p>
    </div>
  )
}

export default Volunteer