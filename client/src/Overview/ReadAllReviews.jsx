import React from 'react';

const ReadAllReviews = ({starRating}) => { // insert the stars here as well
  return (
    <div className="o-read-all-reviews">
      <div className="Stars"
      style={{'--rating': starRating}}>

        </div> <span><a href='#overview-link'>Read all reviews</a></span>
    </div>
  );
};

export default ReadAllReviews;
