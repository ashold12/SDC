import React from 'react';

const SearchQuestions = function ({ questions, onChange, searchQuestions }) {

  return (
    <form className="qa-submit-form" onSubmit={(e) => {
      e.preventDefault()
    }}>
      <input type="search" name="searchBarText" onChange={onChange} className="qa-searchbar qa-griditem1"  placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." results="0"/>

    <input type="submit" value="" name="submitButton" className="qa-searchbar-mag qa-griditem2"/>
    </form>
  )
}

export default SearchQuestions;
