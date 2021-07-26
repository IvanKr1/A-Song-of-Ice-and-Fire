import React from 'react'

const Pagination = ({onClickFirstPage, onClickLastPage, onClickPreviousPage, onClickNextPage}) => {
    return (
        <nav>
            <button onClick={onClickFirstPage}>First Page</button>
            <button onClick={onClickPreviousPage}>Previous Page</button>
            <button onClick={onClickNextPage}>Next Page</button>
            <button onClick={onClickLastPage}>Last Page</button>
        </nav>
    )
}

export default Pagination
