import React from 'react';
import axios from 'axios';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.setInitialState = this.setInitialState.bind(this);
  }

  componentDidMount() {
    const { productId } = this.props;
    // Get meta data.
    axios
      .get(`/api/reviews/meta?product_id=${productId}`)
      .then((data) => {
        this.setInitialState(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  setInitialState(data) {
    // Iterate through the object keys, pull their values and multiply the key times value.\
    // Star calculating formula
    // AR = 1 * (1 star ratings) + 2 * (two star ratings) + ... / 5
    let totalRatingScore = 0;
    let totalNumberOfRatings = 0;
    Object.keys(data.ratings).forEach((key) => {
      totalRatingScore += parseInt(key, 10) * data.ratings[key];
      totalNumberOfRatings += parseInt(data.ratings[key], 10);
    });
    const toNearestDecimal = (totalRatingScore / totalNumberOfRatings).toFixed(1);
    this.setState({
      ...data,
      starRating: toNearestDecimal,
      totalNumberOfReviews: totalNumberOfRatings,
    });
  }

  render() {
    if (!this.state) {
      return <div />;
    }
    const { starRating, totalNumberOfReviews } = this.state;
    return (
      <div className="rr-breakdown">
        Average Rating:
        {starRating}
        <div
          className="Stars"
          style={{ '--rating': starRating }}
          aria-label="Rating of this product is {starRating} out of 5."
        />
        Number of Reviews:
        {totalNumberOfReviews}
      </div>
    );
  }
}

export default RatingBreakdown;
