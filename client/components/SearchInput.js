import React from 'react';

const SearchInput = (props) => {
  return (
    <div>
      <form>
        <label>
          Search:
          <input type="text" 
            name="search" 
            value={props.text} 
            onChange={props.handleChange}/>
        </label>
      </form>
    </div>
  )
}

export default SearchInput