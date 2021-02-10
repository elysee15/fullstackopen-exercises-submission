import axios from 'axios'
const baseUrl = '/api/blogs'


const setToken = () => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  const token = `bearer ${user.token}`
  return token
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return  request.data
}

const create = async data => {
  const config = {
    headers: { Authorization: setToken() },
  }
  const request = await axios.post(baseUrl, data, config)
  return request.data
}

const update = async (id, data) => {
  const request = await axios.put(`${baseUrl}/${id}`, data);
  return request.data;
}

const remove = async (id) => {
  console.log(id)
  const config = {
    headers: { Authorization: setToken() },
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request.data;
}

export default { getAll, create, update, remove };