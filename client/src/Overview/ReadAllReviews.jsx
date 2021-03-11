import React from 'react';

const ReadAllReviews = ({starRating}) => {
  return (
    <div className="o-read-all-reviews">
      <div className="Stars"
      style={{'--rating': starRating}}>

        </div> <span><a id="o-read-link" href='#overview-link'>Read all reviews</a></span>
    </div>
  );
};

export default ReadAllReviews;
