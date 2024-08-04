import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
 

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title or category..."
     
      />
    </div>
  );
};

export default SearchBar;
