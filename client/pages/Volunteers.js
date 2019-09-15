import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import apis from './../apis'

// TODO move this one to components
const VolunteerTable = (props) => {
  return (
    props.items.map((item) => {
      return (
        <li key={item.id}>
          <Link to={`/volunteers/${item.id}`}>{item.first_name}</Link>
        </li>
      )
    })
  )
}

const Volunteers = (props) => {
  const [volunteers, setVolunteers] = useState([]);

  const getVolunteers = () => {
    apis.getVolunteers()
    .then((res) => {
      const data = res.data.data;
      setVolunteers(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getVolunteers();
  }, [])

  return (
    <div>
      <div>Volunteers</div>
      <ul>
        <VolunteerTable items={volunteers}></VolunteerTable>
      </ul>
    </div>        
  )
}

export default Volunteers