import { useState } from 'react'
import './App.css'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let total = bad + neutral + good
  let average = ((bad * -1 + neutral * 0 + good * 1) / total) || 0
  let positivePercentage = ((good / total) * 100) || 0

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <div className="button-container">
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      </div>
      <h1 className="title">Statistics</h1>
      <div>
        <div>good: {good}</div>
        <div>neutral: {neutral}</div>
        <div>bad: {bad}</div>
        <div>all: {total}</div>
        <div>average: {average}</div>
        <div>positive: {positivePercentage} %</div>
      </div>
    </div>
  )
}

export default App