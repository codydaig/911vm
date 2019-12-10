import axios from 'axios';

//const base = 'http://localhost:3030' // TODO: process.env.SERVER_ENDPOINT;
const apis = {}

// Volunteers
apis.getVolunteers = () => {	
	const url = `/api/person`
	return axios.get(url);
}

apis.getVolunteer = (id) => {
	const url = `/api/person/${id}`
	return axios.get(url);
}

apis.searchVolunteers = (keyword) => {
  const url = `/api/person/search`
  return axios.post(url, {
    'keyword': keyword
  })
}

apis.getDashboardData = () => {
  const url = `/api/person/dashboard`
  return axios.get(url);
}

export default apis;