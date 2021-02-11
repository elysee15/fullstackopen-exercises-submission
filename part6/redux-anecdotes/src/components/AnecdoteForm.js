import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {

  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    const getId = () => (100000 * Math.random()).toFixed(0);
    
    const newAnecdote = {
        content,
        id: getId(),
        votes: 0
    };
    event.target.anecdote.value = ''

    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotification(`you are created ${content}`, 2));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
