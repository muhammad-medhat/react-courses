import axios from 'axios';
import React, { Component } from 'react';
// import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AddCourse from './comp/addCourse/addCourse';
import CourseItem from './comp/addCourse/courseItem/courseItem';



class App extends Component {
  state = { 
    courses:[
          // {id: 1, name:'Python'},
          // {id: 2, name:'Flask'},
          // {id: 3, name:'Postgres'},
          // {id: 4, name:'Javascript'},
          // {id: 5, name:'Html'},
          // {id: 6, name:'Css'},
          // {id: 7, name:'React'}
    ]
}
APIURL='http://127.0.0.1:5000/courses'
    async componentDidMount(){
        const {data}  = await axios.get(this.APIURL)
        console.log('get request', data);
        // this.setState({courses: {...data}})
        this.setState({courses: [...data['courses']]})
    }
addCourse = (c) =>{
    console.log('Adding ...',c);
    const courses = this.state.courses
    courses.unshift(c) //to add the item at top 
    //courses.push(c) //to add the item at last 
    this.setState({courses})
    this.insertB(c)
  }
  deleteCourse = id =>{
    if(this.deleteConfirm()){
      const newCourses = this.state.courses.filter(c=>c.id!==id)
      this.setState({courses: newCourses})
      this.deleteB(id)      
    }
  }
  updateCourse = (id, name)=>{
    const courses = this.state.courses
    const course = this.state.courses.find(c=>c.id===id)
    console.log('updating...', course);
    course.course_name=name
    this.setState({courses})
    console.log(this.state);

    this.patchB(course)
  }

  deleteConfirm(){
    return window.confirm('Are you sure')
  }
// Backend functions
  async insertB(c){
    try {
      //Call B
      const obj = c
      await axios.post( `${this.APIURL}`, obj );
  } catch (ex) {
      alert("Cant Insert")
      // this.setState({ todos: oldTodos })
  } 
  }

  async patchB(c){
    try {
      //Call B
      const obj = c
      await axios.patch( `${this.APIURL}/${c.id}`, obj );
    } catch (ex) {
      toast("Cant update")
    } 
  }
  async deleteB(id){

    try {
      //Call B
      await axios.delete( `${this.APIURL}/${id}` );
    } catch (ex) {
      toast("Cant Delete")
    } 
  }

  render() { 
    console.log('state -> courses :', this.state.courses)
    console.log('state -> fcourses :', this.state.fcourses)
    // console.log('state -> courses :', typeof(this.state.courses))
    // console.log('state -> fcourses :', typeof(this.state.fcourses))
    return (     
    <div className="container">
        <header className="App-header">
          <h2>Courses List</h2>
        </header>    
        <div className='App'>
          <AddCourse addCourse={this.addCourse} />
          <hr />
          <ul className="list-group">
              {this.state.courses.map( c=> <CourseItem  
                key={c.id}
                course={c}
                updateCourse={this.updateCourse}
                deleteCourse={this.deleteCourse}/>
                )}
              
            </ul>
                      
        </div>

    </div> 
  );
  }
}
 
export default App;