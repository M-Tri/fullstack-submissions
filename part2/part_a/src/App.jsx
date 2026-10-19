import './App.css'


const Part = ({part}) => (
  <li>
    {part.name} {part.exercises}
  </li>
)

const Content = ({parts}) => (
  <ul className="content-list">
    {parts.map(part => 
      <Part key={part.id} part={part}></Part>
      )
    }
  </ul>
)

const Header = ({courseName}) => (
  <h1>{courseName}</h1>
)

const Course = ({course}) => {
  const total = course.parts.reduce(
    ((sum, part) => sum + part.exercises), 0)

  return (
    <div className="course-container">
      <Header courseName={course.name}></Header>
      <Content parts={course.parts}></Content>
      <div className="total">total of {total} exercises</div>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }, 
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course}/>
}

export default App