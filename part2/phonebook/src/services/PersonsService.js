import axios from "axios";
const baseUrl = '/api/persons';

const getPerson = () => {
	const request = axios.get(baseUrl);
	return request.then(response => response.data)
}

const createPerson = (person) => {
	const request = axios.post(baseUrl, person)
	return request.then(response => response.data)
}

const updatePerson = (id, newPerson) => {
	if (id && newPerson){
		const request = axios.put(`${baseUrl}/${id}`, newPerson)
		return request.then(response => response.data)
	}
}

const deletePerson = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`);
	return request
		.then(response => response.data)
}

const personsService = { getPerson, updatePerson, createPerson, deletePerson }

export default personsService