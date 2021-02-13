import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {


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

    props.createAnecdote(newAnecdote);
    props.setNotification(`you are created ${content}`, 2);
    clearTimeout(2000);
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

const mapPropsToDispatch = {
  createAnecdote,
  setNotification
}

const ConnectedAnecdotesForm = connect(null, mapPropsToDispatch)(AnecdoteForm);

export default ConnectedAnecdotesForm;
