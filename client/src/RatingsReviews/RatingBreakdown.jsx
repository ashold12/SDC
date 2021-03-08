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
    // const { productId } = this.props;
    // // Get meta data.
    // axios
    //   .get(`/api/reviews/meta?product_id=${productId}`)
    //   .then((data) => {
    //     this.setInitialState(data.data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    this.setInitialState(this.props.meta);
  }

  componentDidUpdate(prevProps) {
    if (parseInt(this.props.productId, 10) !== parseInt(prevProps.productId, 10)) {
      this.setInitialState(this.props.meta);
    }
  }

  getReviewBar(indexNumber, starNumber) {
    let numberOfVotes = this.props.meta.ratings[starNumber];
    let percentage;
    let totalReviews = 0;
    Object.keys(this.props.meta.ratings).forEach((key) => {
      totalReviews += parseInt(this.props.meta.ratings[key], 10);
    });
    if (!this.props.meta.ratings[starNumber]) {
      percentage = 0;
      numberOfVotes = 0;
    } else {
      percentage = (this.props.meta.ratings[starNumber] / totalReviews) * 100;
    }
    const barStyling = {
      width: `${percentage}%`,
      backgroundColor: '#2be255',
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
    const { ratings } = this.props.meta;
    Object.keys(ratings).forEach((key) => {
      totalRatingScore += parseInt(key, 10) * ratings[key];
      totalNumberOfRatings += parseInt(ratings[key], 10);
    });
    const toNearestDecimal = (totalRatingScore / totalNumberOfRatings).toFixed(1);
    // Calculate the recommended amount and the number of reviewers.
    const usersRecommendedPercentage = (
      (parseInt(this.props.meta.recommended.true, 10) / totalNumberOfRatings) *
      100
    ).toFixed(0);
    this.setState({
      characteristics: this.props.meta.characteristics,
      ratings: this.props.meta.ratings,
      product_id: this.product_id,
      recommended: this.props.meta.recommended,
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
        <div className="rr-reviews-bar-container">{ratingBars}</div>
        <hr className="rr-line-break" />
      </div>
    );
  }
}

export default RatingBreakdown;
