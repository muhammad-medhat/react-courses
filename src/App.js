import React, { Component } from 'react';
// import './App.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import AddCourse from './comp/addCourse/addCourse';
import CourseItem from './comp/addCourse/courseItem/courseItem';



class App extends Component {
  state = { 
    courses:[
        {id: 1, name:'Python'},
        {id: 2, name:'Flask'},
        {id: 3, name:'Postgres'},
        {id: 4, name:'Javascript'},
        {id: 5, name:'Html'},
        {id: 6, name:'Css'},
        {id: 7, name:'React'}

    ]
}
addCourse = (c) =>{
    console.log('Adding ...',c);
    const courses = this.state.courses
    courses.push(c)
    this.setState({courses})
    //this.insertB(t)
  }
  deleteCourse = id =>{
    const newCourses = this.state.courses.filter(c=>c.id!==id)
    this.setState({courses: newCourses})
    // this.deleteB(id)
  }
  updateCourse = (id, name)=>{
    const courses = this.state.courses
    const course = this.state.courses.find(c=>c.id===id)
    console.log('updating...', course);
    course.name=name
    this.setState({courses})
    console.log(this.state);
  }
  render() { 
    return (     
    <div className="App container">
        <header className="App-header">
          <h2>Courses List</h2>
          <ul>
            {this.state.courses.map( c=> <CourseItem  
              key={c.id}
              course={c}
              updateCourse={this.updateCourse}
              deleteCourse={this.deleteCourse}/>
              )}
            
          </ul>
          <AddCourse addCourse={this.addCourse} />
        </header>
    </div> 
  );
  }
}
 
export default App;