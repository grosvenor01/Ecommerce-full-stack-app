import React from 'react'

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    

    const goToNextPage = () => {
            // if(currentPage !== nPages) setCurrentPage(currentPage + 1)
            console.log("next page")
    }
    const goToPrevPage = () => {
        // if(currentPage !== 1) setCurrentPage(currentPage - 1)
        console.log("prev page")
    }
    return (
        <nav>
            <ul className='pagination justify-content-center'>
                <li className="page-item">
                    <a className="page-link" 
                        onClick={goToPrevPage} 
                        href='#'>
                        
                        Previous
                    </a>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} 
                        className= {`page-item ${currentPage == pgNumber ? 'active' : ''} `} >

                        <a onClick={() => setCurrentPage(pgNumber)}  
                            className='page-link ' 
                            href='#'>
                            
                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a className="page-link" 
                        onClick={goToNextPage}
                        href='#'>
                        
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination