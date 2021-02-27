import React from 'react';
import dummyReviews from './dummyReviews';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    // Single test review testing block.
    let [testReview] = dummyReviews.results;
    // Calculate star rating.
    if (testReview.rating > 0) {
      testReview.starRating = parseFloat((Math.round(testReview.rating * 4) / 4).toFixed(2));
    }
    this.state = {
      ...testReview,
    };
  }

  getReviewSummary() {
    // Truncation logic.
    let { summary } = this.state;
    summary = summary.slice(0, 60);

    if (summary[summary.length - 1] === ' ') {
      summary = summary.split(' ');
      delete summary[summary.length - 1];
      summary = summary.join(' ');
    } else {
      summary = summary.split(' ');
      delete summary[summary.length - 1];
      summary = `${summary.join(' ')} ...`;
    }

    return summary;
  }

  getReviewBodyObject() {}

  getFormattedDate() {
    const date = new Date(this.state.date);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let day = date.getDate().toString();
    if (day.length < 2) {
      day = `0${day}`;
    }
    const formattedDate = `${months[date.getMonth()]} ${day}, ${date.getFullYear()}`;
    return formattedDate;
  }

  hasRegisteredEmail() {
    const { email } = this.state;
    if (email) {
      return true;
    }
    return false;
  }

  render() {
    const { reviewer_name } = this.state;
    let checkmark = '';
    if (this.hasRegisteredEmail()) {
      checkmark = '✓';
    }
    const title = this.getReviewSummary();
    return (
      <div className="rr-review-tile-container">
        <div
          className="Stars"
          style={{ '--rating': this.state.starRating }}
          aria-label="Rating of this product is {this.state.starRating} out of 5."
        />
        <div className="rr-tile-checkmark">
          {checkmark} {reviewer_name}, {this.getFormattedDate()}
        </div>
        <div className="rr-tile-summary">
          <b>{title}</b>
        </div>
        <div className="rr-review-body">{this.state.body}</div>
      </div>
    );
  }
}

export default ReviewTile;
