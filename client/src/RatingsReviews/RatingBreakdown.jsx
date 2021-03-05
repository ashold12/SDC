import React from 'react';
import axios from 'axios';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
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

  getReviewBar(indexNumber, starNumber) {
    let numberOfVotes = this.state.ratings[starNumber];
    let percentage;

    if (!this.state.ratings[starNumber]) {
      percentage = 0;
      numberOfVotes = 0;
    } else {
      percentage = (this.state.ratings[starNumber] / this.state.totalNumberOfReviews) * 100;
    }
    const barStyling = {
      width: `${percentage}%`,
      backgroundColor: '#4CAF50',
    };
    return (
      <div key={indexNumber} className="rr-review-bar-star-count">
        # Stars {indexNumber} With {numberOfVotes} votes.
        <div className="rr-review-bar-container">
          <div
            className="rr-review-bar"
            style={barStyling}
            value={indexNumber}
            onClick={(e) => {
              this.props.changeFilter(indexNumber);
            }}
            id={`rr-bar-${starNumber}`}
          />
        </div>
      </div>
    );
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
    // Calculate the recommended amount and the number of reviewers.
    const usersRecommendedPercentage = (
      (parseInt(data.recommended.true, 10) / totalNumberOfRatings) *
      100
    ).toFixed(0);
    this.setState({
      ...data,
      starRating: toNearestDecimal,
      totalNumberOfReviews: totalNumberOfRatings,
      usersRecommendedPercentage: usersRecommendedPercentage,
      loaded: true,
    });
  }

  render() {
    if (this.state.loaded === false) {
      return <div />;
    }
    let filterString = '';
    if (this.props.filters.length > 0) {
      filterString += 'Filtering by:';
      this.props.filters.forEach((filter) => {
        filterString += ` ${filter}`;
        filterString += ' star reviews.';
      });
    }
    const { starRating, totalNumberOfReviews } = this.state;
    // Map ratings.
    const ratingBars = [];
    for (let i = 1; i <= 5; i++) {
      const bar = this.getReviewBar(i, i);
      ratingBars.push(bar);
    }
    return (
      <div className="rr-breakdown">
        Average Rating: {starRating} {this.state.usersRecommendedPercentage}% of reviews recommend
        this product.
        <div
          className="Stars"
          style={{ '--rating': starRating }}
          aria-label="Rating of this product is {starRating} out of 5."
        />
        <div className="rr-filters-applied">{filterString}</div>
        Number of Reviews: {totalNumberOfReviews}
        <div className="rr-review-bar-container">{ratingBars}</div>
      </div>
    );
  }
}

export default RatingBreakdown;
