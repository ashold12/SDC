import React from 'react';
import NumberAndStars from './NumberAndStars.jsx';
import ReviewTile from './ReviewTile.jsx';
import dummyReviews from './dummyReviews';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: dummyReviews.product,
      rating: dummyReviews.results[0].rating,
    };
  }

  render() {
    return (
      <div className="rr-parent">
        Ratings & Reviews
        <div className="rr-rating-big">
          <NumberAndStars rating={this.state.rating} />
          <div className="rr-rating-breakdown">
            Rating Breakdown
            <div className="rr-rating">5 divs with rating breakdowns</div>
            <div className="rr-rating">5 divs with rating breakdowns</div>
            <div className="rr-rating">5 divs with rating breakdowns</div>
            <div className="rr-rating">5 divs with rating breakdowns</div>
            <div className="rr-rating">5 divs with rating breakdowns</div>
          </div>
        </div>
        <ReviewTile />
      </div>
    );
  }
}

export default RatingsReviews;
