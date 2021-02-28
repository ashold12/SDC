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
    this.state.body =
      this.state.body +
      'Some super long winded review that no one is ever going to read because it is stupid and who cares about all this bs seriously its like who cares there is so much other stuff to do and these reviews are useless';
    this.showMoreReview = this.showMoreReview.bind(this);
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
      summary = `${summary.join(' ')}...`;
    }

    return summary;
  }

  getReviewBodyObject() {
    const { body } = this.state;
    const bodObject = {};
    bodObject.body = body;
    bodObject.truncatedBody = `${body.slice(0, 250)}...`;
    if (body.length > 250) {
      bodObject.isTruncated = true;
    } else {
      bodObject.isTruncated = false;
    }
    return bodObject;
  }

  getReviewBodyHTML() {
    const { body, truncatedBody, isTruncated } = this.getReviewBodyObject();
    const id = this.state.review_id;
    if (isTruncated) {
      return (
        <div className="rr-body-text" id={id}>
          {truncatedBody}
          <div className="rr-body-show-more">
            <a href="#" onClick={this.showMoreReview}>
              Show More...
            </a>
          </div>
        </div>
      );
    }
    return <div className="rr-body-text">{body}</div>;
  }

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

  showMoreReview(e) {
    const bodyText = document.getElementById(this.state.review_id);
    bodyText.innerText = this.state.body;
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
        <div className="rr-review-body">{this.getReviewBodyHTML()}</div>
      </div>
    );
  }
}

export default ReviewTile;
