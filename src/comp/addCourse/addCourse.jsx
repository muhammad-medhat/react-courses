import React, { Component } from 'react';
import './addCourese.css'
class AddCourse extends Component {
    state = { name: '' }
    handleChange = (e) =>{
        // console.log(e);
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(this.state)
    }
    submitForm = (e)=>{
        e.preventDefault()
        this.props.addCourse(this.state)
        this.setState({name:''})
    }
    render() { 
        return ( 
            <>
            <form className="border" onSubmit={this.submitForm}>
                <input type="text" 
                    id='name' 
                    name='name' 
                    onChange={this.handleChange}
                    value={this.state.name}/>

                <button>Add Course</button>
            </form>
            </>
         );
    }
}
 
export default AddCourse;