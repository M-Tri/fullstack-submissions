import { useState } from 'react'
import './App.css'


const Button = ({clickType, text}) => {
  return (
    <div className="button-container">
        <button onClick={clickType}>{text}</button>
    </div>
  )
}

const StatisticsLine = ({text, value}) => {
  if (text === "positive") {
    return (
      <tr>
        <td>
          {text}
        </td>
        <td>
          {value} %
        </td>
      </tr>
    )
  }

  return  (
    <tr>
        <td>
          {text}
        </td>
        <td>
          {value}
        </td>
    </tr>
  )
}

const Statistics = ({clicks, stats}) => {
  if (clicks.good + clicks.bad + clicks.neutral === 0) {
    return (
      <>
      <h1 className="title">Statistics</h1>
      <div>No feedback given</div>
      </>
    )
  }
  return (
    <>
      <h1 className="title">Statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text="good" value={clicks.good}></StatisticsLine>
            <StatisticsLine text="neutral" value={clicks.neutral}></StatisticsLine>
            <StatisticsLine text="bad" value={clicks.bad}></StatisticsLine>
            <StatisticsLine text="all" value={stats.total}></StatisticsLine>
            <StatisticsLine text="average" value={stats.average}></StatisticsLine>
            <StatisticsLine text="positive" value={stats.positivePercentage}></StatisticsLine>
          </tbody>
        </table>
    </>
  )
}

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
        <Button text="good" clickType={handleGoodClick}></Button>
        <Button text="neutral" clickType={handleNeutralClick}></Button>
        <Button text="bad" clickType={handleBadClick}></Button>
      </div>
      <Statistics
        clicks={{good:good, neutral:neutral, bad:bad}}
        stats={{total:total, average:average, positivePercentage:positivePercentage}}>
      </Statistics>
    </div>
  )
}

export default App