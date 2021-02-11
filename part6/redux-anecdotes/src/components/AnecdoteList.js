import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVote, initializeAnecdotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import Notification from "./Notification";
import anecdoteService from "../service/anecdotes";

const AnecdoteList = (props) => {
  useEffect(() => {
    const fetchAnecdotes = async () => {
      const anecdotes = await anecdoteService.getAll()
        dispatch(initializeAnecdotes(anecdotes));
    };
    fetchAnecdotes();
  }, []);

  const anecdotes = useSelector((state) => state.anecdotes);
  console.log('anecdotes', anecdotes)
  const filteredAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  const vote = ({ id, content }) => {
    console.log("vote", id);
    dispatch(createVote(id));
    dispatch(setNotification(`you voted ${content}`, 2));
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

export default AnecdoteList;
