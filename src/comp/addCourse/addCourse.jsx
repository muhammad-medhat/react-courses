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
                <form className="input-group input-group-sm row" onSubmit={this.submitForm}>
                        {/* <label htmlFor="name">Add Course</label> */}
                        <div className="input-group-prepend col" >
                            <span className="input-group-text">

                                <input type="text" 
                                    id='name' 
                                    name='name' 
                                    className='col'
                                    onChange={this.handleChange}
                                    value={this.state.name}/>
                            </span>
                        </div>

                        <div className="buttons btn-group  col">
                            <button  className='btn btn-success'>Add Course</button>
                        </div>
                </form>
            </>
         );
    }
}
 
export default AddCourse;