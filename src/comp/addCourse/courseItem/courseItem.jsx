import React from 'react';
const CourseItem = props => {
    const {courses, deleteCourse} = props
    return ( 
        courses.map(c => {
            return(
                <li>
                    <span>
                        {c.name}
                    </span>
                    <span  className='text-danger' onClick={()=>deleteCourse(c.id)}>
                        <p style={{cursor: 'pointer'}}>
                            &#x2717;  
                        </p> 
                    </span>
                    
                </li>
            )}
        )
     );
}
 
export default CourseItem;