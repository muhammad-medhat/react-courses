import React from 'react';
const CourseItem = props => {
    // const {courses, deleteCourse} = props
    // renderCourse = courses =>{
        
    // }
    return ( 
        <li>
            {props.course}
        </li>
        // courses.map(c => {
        //     return(
        //         <li>
        //             <span>
        //                 {c.name}
        //             </span>
        //             <span  className='text-primary' onClick={()=>deleteCourse(c.id)}>
        //                 <p style={{cursor: 'pointer'}}>
        //                     Edit 
        //                 </p> 
        //             </span>
        //             <span  className='text-danger' onClick={()=>deleteCourse(c.id)}>
        //                 <p style={{cursor: 'pointer'}}>
        //                     Delete  
        //                 </p> 
        //             </span>
                    
        //         </li>
        //     )}
        )
    //  );
}
 
export default CourseItem;