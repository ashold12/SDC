import React from 'react';

const SearchQuestions = function ({ questions, onChange }) {

  return (
    <form className="qa-submit-form" onSubmit={(e) => {
      e.preventDefault()
    }}>
    <input type="search" name="searchBarText" onChange={onChange} className="qa-searchbar"  placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." results="0"/>

    <input type="submit" value="" name="submitButton" className="qa-searcbar-mag" />
    </form>
  )
}

export default SearchQuestions;
