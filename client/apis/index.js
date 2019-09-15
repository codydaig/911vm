import axios from 'axios';

const base = 'http://localhost:3030' // TODO: process.env.SERVER_ENDPOINT;
const apis = {}

// Volunteers
apis.getVolunteers = () => {	
	const url = `${base}/api/person`
	return axios.get(url);
}

apis.getVolunteer = (id) => {
	const url = `${base}/api/person/${id}`
	return axios.get(url);
}

apis.searchVolunteers = (keyword) => {
  const url = `${base}/api/person/search`
  return axios.post(url, {
    'keyword': keyword
  })
}

export default apis;