import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(0);
  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0)); 
  
  const copy = [...votes];

  const random = () => Math.floor(Math.random() * anecdotes.length);
  const changeAnecdote = (e) => setSelected(random());
  const voteAnecdote = (e) => {
    copy[selected] += 1;
    setVotes(copy);
    setVote(vote + 1);
  };
  const mostVotedIndex = votes.indexOf(Math.max(...votes));
  return (
    <div>
      <Anecdote text="Anecdote of the day" selected={selected} votes={votes}/>
      <div>
        <Button handleClick={voteAnecdote} text="Vote"/>
        <Button handleClick={changeAnecdote} text="next anecdotes"/>
      </div>
      <div>
      <Anecdote text="Anecdotes with most votes" selected={mostVotedIndex} votes={votes}/>
      </div>
    </div>
  )
}

const Button = ({handleClick, text}) => (<button onClick={handleClick}> {text} </button>);
const Anecdote = ({text, selected, votes}) => {
  return (
    <>
    <h1>{text}</h1>
    {anecdotes[selected]} <br/>
      has {votes[selected]} votes
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById('root')
);
