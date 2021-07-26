import React from 'react'

const SearchField = ({onSearchCulture}) => {
    return (
        <div className="">
            <input type="text" placeholder="Search..." onChange={(e) => onSearchCulture(e.target.value)}/>
        </div>
    )
}

export default SearchField
