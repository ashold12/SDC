import React from 'react';
import RatingBreakdown from './RatingBreakdown.jsx';
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
    const { product_id } = this.state;
    return (
      <div className="rr-parent">
        Ratings & Reviews
        <div className="rr-rating-big">
          <RatingBreakdown productId={this.state.product_id} />
          <div className="rr-rating-breakdown">
            Rating Breakdown
            <div className="rr-rating">5 divs with rating breakdowns</div>
            <div className="rr-rating">5 divs with rating breakdowns</div>
            <div className="rr-rating">5 divs with rating breakdowns</div>
            <div className="rr-rating">5 divs with rating breakdowns</div>
            <div className="rr-rating">5 divs with rating breakdowns</div>
          </div>
        </div>
        <ReviewTile item={product_id} />
      </div>
    );
  }
}

export default RatingsReviews;
