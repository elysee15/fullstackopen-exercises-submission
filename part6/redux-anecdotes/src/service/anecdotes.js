import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (data) => {
  const response = await axios.post(baseUrl, data);
  return response.data;
}

const update = async (id) => {
  const anecdoteToUpdate = await axios.get(`${baseUrl}/${id}`);
  const newAnecdote = {
    votes: parseInt(anecdoteToUpdate.data.votes, 10) + 1
  };
  const response = await axios.patch(`${baseUrl}/${id}`, newAnecdote);
  return response.data;
}

export default { getAll, create, update };
