import anecdoteService from "../service/anecdotes";

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "SET_VOTE":
      console.log('state', state, 'action', action)
      return state.map((anecdote) =>
        anecdote.id === action.data.id
          ? { ...anecdote, votes: action.data.votes }
          : anecdote
      );
    case "SET_NEW_ANECDOTE":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      console.log("init", action);
      return action.data;
    default:
      return state;
  }
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(anecdote);
    dispatch({
      type: "SET_NEW_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const createVote = (id) => {
  return async (dispatch) => {
    const newVote = await anecdoteService.update(id);
    dispatch({
      type: "SET_VOTE",
      data: {
        ...newVote,
      },
    });
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes,
  };
};

export default reducer;
