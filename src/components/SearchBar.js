import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" name="sort" value="Alphabetically" checked={null} onChange={props.handleSort}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" name="sort" value="Price" checked={null} onChange={props.handleSort}/>
        Price
      </label>
      <label>
        <input type="radio" name="sort" value="Unsorted" checked={null} onChange={props.handleSort}/>
        Unsorted
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={props.handleFilter}>
          <option value="All">All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>

    </div>
  );
}


export default SearchBar;
