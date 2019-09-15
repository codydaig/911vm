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

export default apis;