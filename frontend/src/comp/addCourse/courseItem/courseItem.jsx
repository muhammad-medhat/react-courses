import React, { Component } from 'react';
class CourseItem extends Component {
    state = { 
        isEdit: false,
        id: this.props.course.id,
        course_name: this.props.course.course_name
    }
    handleChange = (e) =>{
        // console.log(e);
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log('new state', this.state )
        // console.log(e)
    }
    submitForm = (e)=>{
        e.preventDefault()
        console.log('form submit...');
        this.props.updateCourse(this.state.id, this.input.value)
        this.toggleEdit()
        // this.setState({name:''})
    }

    renderCourse = ()=>{    
        const {deleteCourse} = this.props

        return ( 
            <>
            <li className="list-group-item">
                <div className="input-group input-group-sm row">

                    <div className="input-group-prepend col" >
                        <span className="input-group-text">{this.props.course.course_name}</span>
                    </div>

                    <div className="buttons btn-group  col">
                        <button  className='btn btn-primary' onClick={this.toggleEdit}>
                                Edit 
                        </button>
                        <button  className='btn btn-danger' onClick={()=>deleteCourse(this.props.course.id)}>
                                Delete  
                        </button>                        
                    </div>

                </div>
            </li>
            </>
        )
    }

    renderEdit = () =>{
        // console.log('props',this.props);
        return(
            <li className="list-group-item">
                <form className="input-group input-group-sm row" onSubmit={this.submitForm}>
                {/* <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"> */}
                <div className="input-group-prepend col">

                        <span className="input-group-text">
                            <input type="text" 
                                id='name' 
                                name='name' 
                                className='col'
                                ref={r=>this.input=r}
                                onChange={this.handleChange}
                                defaultValue={this.state.course_name}/>
                        </span>
                    </div>
                    <div className="input-group-prepend col" >
                        <button type='submit' className='btn btn-info w-50'>Update Course</button>
                    </div>
                </form>
            </li>
    )}

        toggleEdit = ()=>{
            this.setState({isEdit: !this.state.isEdit})
        }



    render() { 
        return(
            <>
                {(!this.state.isEdit)? this.renderCourse(): this.renderEdit()}
            </>
        )    
    }
}
 
export default CourseItem;
