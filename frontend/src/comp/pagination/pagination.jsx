import React from 'react';
import './pagination.css'
const Pagination = (props) => {
    const {page, totalPages, moveTo} = props
    const pagesArr = [...Array(totalPages).keys()]
    const pagesLst = pagesArr.map(n=>n+1)
    // console.log('pagination props', props);
    return (  
        <>
        Page {page} of {totalPages}
        <nav aria-label="Page navigation example">

          <ul className="pagination justify-content-center">

            {
                pagesLst.map( p=>{
                    const cls = (p===page)? 'page-item active': 'page-item'
                    return  (
                        <li className={cls}>
                            
                            <span className="page-link" onClick={()=>moveTo(p)}>
                                {p}
                            </span>
                            
                        </li> 
                    )               
                })
            }
            </ul>
            </nav>
        </>
    );
}
 
export default Pagination;