
export const Header = ({course}) => {
    return  <h1>{course}</h1>
}
  
const Part = ({part}) => {
    return <p> {part.name} </p>;
}
  
const Content = ({parts}) => {
    return (
    <div>
        {
            parts.map((part, index) => 
            <Part part={part} key={index}/>
            )
        }
    </div>
)
}

const Total = ({parts}) => {
    const total = parts.reduce((acc, currentValue) => acc + currentValue.exercises, 0)
    
    return <b>total of {total} exercises</b>;
  }

const Course = ({course}) => {
   return ( 
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course;