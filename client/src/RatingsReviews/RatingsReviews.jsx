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
      filters: [],
    };
  }

  render() {
    const { product_id, filters } = this.state;
    return (
      <div className="rr-parent" id="overview-link">
        Ratings & Reviews
        <div className="rr-rating-big">
          <div className="rr-rating-breakdown">
            <RatingBreakdown productId={product_id} filters={filters} />
          </div>
        </div>
        <ReviewTile item={product_id} />
      </div>
    );
  }
}

export default RatingsReviews;
