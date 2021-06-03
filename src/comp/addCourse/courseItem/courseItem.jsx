import React, { Component } from 'react';
class CourseItem extends Component {
    state = { 
        isEdit: false,
        id: this.props.course.id,
        name: this.props.course.name
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
            <li>
                <span>
                    {this.props.course.name}
                </span>
                <button  className='text-primary' onClick={this.toggleEdit}>
                    <p style={{cursor: 'pointer'}}>
                        Edit 
                    </p> 
                </button>
                <button  className='text-danger' onClick={()=>deleteCourse(this.props.course.id)}>
                    <p style={{cursor: 'pointer'}}>
                        Delete  
                    </p> 
                </button>

            </li>
            </>
        )
    }

    renderEdit = () =>{
        console.log('props',this.props);
        return(
            <form onSubmit={this.submitForm}>
                <input type="text" 
                    id='name' 
                    name='name' 
                    ref={r=>this.input=r}
                    onChange={this.handleChange}
                    defaultValue={this.state.name}/>

                <button type='submit'>Update Course</button>
            </form>
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
