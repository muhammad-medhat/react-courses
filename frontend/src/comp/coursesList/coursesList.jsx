import React, {useState} from 'react';
import CourseItem from '../courseItem/courseItem';
import Pagination from '../pagination/pagination';
import './coursesList.css'
const CoursesList = (props) => {
    const PER_PAGE=4
    const [page, setPage] = useState(1)

    const {coursesList, update, deleteC} = props

    const startIdx = (page-1) * PER_PAGE
    const selected = coursesList.slice(startIdx, startIdx + PER_PAGE)

    const totalPages = Math.ceil(coursesList.length / PER_PAGE)
    
    const chPage = (numPage) =>{
        setPage(numPage)
    }

    console.log('props', props);
    return ( 
        <>
        {selected.map(c=>{
            return <CourseItem 
                key={c.id}
                course={c}
                updateCourse={update}
                deleteCourse={()=>deleteC(c.id)}
            />
        })}
        <Pagination page={page} totalPages={totalPages} moveTo={chPage} />
        </>
     );
}
 
export default CoursesList;