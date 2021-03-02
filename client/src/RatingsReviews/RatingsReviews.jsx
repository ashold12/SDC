import React from 'react';
import RatingBreakdown from './RatingBreakdown.jsx';
import ReviewTile from './ReviewTile.jsx';
import ProductBreakDown from './ProductBreakDown.jsx';
import axios from 'axios';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.tempReview = 17762;
    this.state = {
      loadedReviews: false,
      loadedMeta: false,
      product_id: this.tempReview,
      filters: [],
    };
  }

  componentDidMount() {
    axios
      .get(`/api/reviews/?product_id=${this.tempReview}`)
      .then((data) => {
        this.setState({
          loadedReviews: true,
          product_id: this.tempReview,
          reviews: data.data.results
        });
      })
      .catch((e) => { console.log(e) });
    axios
      .get(`/api/reviews/meta?product_id=${this.tempReview}`)
      .then((data) => {
        this.setState({ meta: data.data, loadedMeta: true });
      })
      .catch((e) => { console.log(e); });
  }

  render() {
    if (this.state.loadedReviews === false || this.state.loadedMeta === false) {
      return <div />;
    }
    //Get two reviews.
    const tiles = [];
    for (let i = 0; i < 2; i += 1) {
      tiles.push(<ReviewTile item={product_id} key={i} review={this.state.reviews[i]} />);
    }
    const { product_id, filters } = this.state;
    return (
      <div>
        <div className="rr-parent">
          Ratings & Reviews
        <div className="rr-rating-big">
          </div>
          {tiles}
        </div>
        <div className="rr-rating-breakdown">
          <RatingBreakdown productId={product_id} filters={filters} />
        </div>
        <div className='rr-product-breakdown-container'>
          <ProductBreakDown characteristics={this.state.meta} />
        </div>
      </div>
    );
  }
}

export default RatingsReviews;
