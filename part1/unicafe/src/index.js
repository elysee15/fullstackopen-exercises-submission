import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Statistics = (props) => {
  const {total, average, feedbacks, positiveFeedbacksPercentage} = props
  const noFeedbacksMessage = 'No feedbak given';
  if (total) {
    return (
      <div>
        <table>
          <tbody>
            <Statistic text='good' value={feedbacks.good} />
            <Statistic text='neutral' value={feedbacks.neutral } />
            <Statistic text='bad' value={feedbacks.bad} />
            <Statistic text='average' value={ average } />
            <Statistic text='positive' value={ positiveFeedbacksPercentage } />
          </tbody>
        </table>
      </div>
    )
  }
  return noFeedbacksMessage;
}

const Statistic = ({text, value}) => {
  return (
    <>
      <tr>
        <td> {text} </td>
        <td> {value} </td>
      </tr>
    </>
  )
};


const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}> {text} </button>
  )
}


const App = () => {
    // save clicks of each button to its own state
    const [feedback, setFeedback] = useState({good: 0, neutral: 0, bad: 0});

    const handleGoodClick = (e) => {
      return setFeedback({good : feedback.good + 1, neutral: feedback.neutral, bad: feedback.bad });
    }

    const handleNeutralClick = (e) => {
      return setFeedback({good : feedback.good, neutral: feedback.neutral + 1, bad: feedback.bad });
    }

    const handleBadClick = (e) => {
      return setFeedback({good : feedback.good, neutral: feedback.neutral, bad: feedback.bad + 1 });
    }

    const feedbacksTotal = feedback.good + feedback.neutral + feedback.bad;
    const feebacksAverage = ((feedback.good * 1) + (feedback.neutral * 0) + (feedback.bad * -1)) / feedbacksTotal;
    const positiveFeedbacksPercentage = (feedback.good / feedbacksTotal) * 100 + '%';

    return (
      <div>
        <h1>give feedback</h1>
          <Button text='good' handleClick={handleGoodClick} />
          <Button text='neutral' handleClick={handleNeutralClick} />
          <Button text='bad' handleClick={handleBadClick} />
        <h1>statistics</h1>
        <Statistics 
          feedbacks={feedback} 
          total={feedbacksTotal}
          average={feebacksAverage}
          positiveFeedbacksPercentage={positiveFeedbacksPercentage}
        />
      </div>
    )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);