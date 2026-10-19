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
  <h2>{courseName}</h2>
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

export default Course