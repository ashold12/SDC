import React from 'react';
import RatingBreakdown from './RatingBreakdown.jsx';
import ReviewTile from './ReviewTile.jsx';
import axios from 'axios';
import dummyReviews from './dummyReviews';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.tempReview = 17762;
    this.state = {
      loaded: false,
      product_id: props.reviewId,
      filters: [],
    };
  }

  componentDidMount() {
    axios.get(`/api/reviews/?product_id=${this.tempReview}`).then((data) => {
      this.setState({
        loaded: true,
        product_id: this.tempReview,
        reviews: data.data.results
      });
    });
  }

  render() {
    if (this.state.loaded === false) {
      return <div />;
    }
    //Get two reviews.
    const tiles = [];
    for (let i = 0; i < 2; i += 1) {
      tiles.push(<ReviewTile item={product_id} review={this.state.reviews[i]} />);
    }
    const { product_id, filters } = this.state;
    return (
      <div className="rr-parent">
        Ratings & Reviews
        <div className="rr-rating-big">
          <div className="rr-rating-breakdown">
            <RatingBreakdown productId={product_id} filters={filters} />
          </div>
        </div>
        {tiles}
      </div>
    );
  }
}

export default RatingsReviews;
