import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createVote, initializeAnecdotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import Notification from "./Notification";
import anecdoteService from "../service/anecdotes";

const AnecdoteList = (props) => {
  useEffect(() => {
    const fetchAnecdotes = async () => {
      const anecdotes = await anecdoteService.getAll()
        props.initializeAnecdotes(anecdotes);
    };
    fetchAnecdotes();
  }, []);

  const filteredAnecdotes = props.anecdotes.sort((a, b) => b.votes - a.votes);

  const vote = ({ id, content }) => {
    props.createVote(id);
    props.setNotification(`you voted ${content}`, 2);
    clearTimeout(2000)
  };

  return (
    <>
      <Notification />
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

const mapStateToDispath = {
  initializeAnecdotes,
  createVote,
  setNotification
}

const ConnectedAnecdotesList = connect(mapStateToProps, mapStateToDispath)(AnecdoteList);

export default ConnectedAnecdotesList;
