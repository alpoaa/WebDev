const Header = ({ text }) => {
    return (
      <>
      <h1>{text}</h1>
      </>
    )
}
  
const Part = ({ part }) => {
    return (
      <>
      <p>{part.name} {part.exercises}</p>
      </>
    )
}
  
const Content = ({parts}) => {
    return (
      <>
        {parts.map(part => <Part key={part.id} part={part} />)}
      </>
    )
}
  
const Total = ({ parts }) => {
    const sumExercises = parts.reduce((sum, part) => {
      return sum + part.exercises
    }, 0)
  
    return (
      <>
      <p><strong>total of {sumExercises} exercises</strong></p>
      </>
    )
}
  
  
const Course = ({ course }) => {
    return (
        <>
        <Header text={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </>
    )
}

export default Course