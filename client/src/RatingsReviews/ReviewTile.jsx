import React from 'react';
import axios from 'axios';
import RRModal from './PhotoModal.jsx';

// TODO: Fix technical debt. A11y issues, general formatting.
// Tile needs to be a fixed size.
// Update helpfulness state.
// Update for use with real data.
// Write some tests.
// Clean up CSS

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    // Single test review testing block.
    //let [testReview, testReview2] = dummyReviews.results;
    // Calculate star rating.
    let starRating = 0;
    let helpfulness = 0;
    if (!props.review) {
      starRating = 0;
      helpfulness = 0;
    } else if (props.review.rating > 0) {
      starRating = parseFloat((Math.round(props.review.rating * 4) / 4).toFixed(2));
      helpfulness = this.props.review.helpfulness;
    }
    this.state = {
      starRating,
      showModal: false,
      modalURL: '',
      helpfulClicked: false,
      helpfulness: helpfulness,
    };
    this.showMoreReview = this.showMoreReview.bind(this);
    this.showPhotoModal = this.showPhotoModal.bind(this);
    this.hidePhotoModal = this.hidePhotoModal.bind(this);
    this.changeHelpfulness = this.changeHelpfulness.bind(this);
  }

  getReviewSummary() {
    // Truncation logic.
    let { summary } = this.props.review;
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
    const { body } = this.props.review;
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
    const id = this.props.review.review_id;
    if (isTruncated) {
      return (
        <div className="rr-body-text" id={id}>
          {truncatedBody}
          <div className="rr-body-show-more">
            <a onClick={this.showMoreReview}>Show More...</a>
          </div>
        </div>
      );
    }
    return <div className="rr-body-text">{body}</div>;
  }

  getPhotosHTML() {
    const { photos } = this.props.review;
    const photoList = photos.map((photo) => {
      return (
        <img
          className="rr-product-thumbnail"
          key={photo.id}
          src={photo.url}
          onClick={this.showPhotoModal}
          alt="Product small."
        />
      );
    });
    return photoList;
  }

  getFormattedDate() {
    const date = new Date(this.props.review.date);
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

  getRecommendedHTML() {
    if (this.props.review.recommend) {
      return <div className="rr-recommended ">✓ I recommend this product.</div>;
    }
  }

  showPhotoModal(e) {
    this.setState({ showModal: true, modalURL: e.target.src });
  }

  getResponseHTML() {
    if (this.props.review.response) {
      return (
        <div className="rr-staff-response">
          Response from seller
          <div>{this.props.review.response}</div>
        </div>
      );
    }
  }

  getHelpfulHTML() {
    const { helpfulClicked, reported } = this.state;
    const { helpfulness } = this.props.review;
    if (!helpfulClicked) {
      return (
        <div className="rr-helpfulness">
          helpful?
          {/*eslint-disable*/
          /*using link as button per spec*/}
          <a href="#!" className="rr-helpfulness-link" onClick={this.changeHelpfulness}>
            {/*eslint-disable*/
            /*wants to change parens*/}
            Yes ({helpfulness})
          </a>
          {' | '}
          <a href="#!" className="rr-helpfulness-link" onClick={this.changeHelpfulness}>
            Report
          </a>
          {/* eslint-enable */}
        </div>
      );
    }
    if (reported) {
      return <div className="rr-helpfulness">This review has been reported.</div>;
    }

    return <div className="rr-helpfulness">You found this review helpful.</div>;
  }

  showMoreReview() {
    const { body, review_id } = this.props.review;
    const bodyText = document.getElementById(review_id);
    bodyText.innerText = body;
  }

  hidePhotoModal() {
    this.setState({ showModal: false, modalURL: '' });
  }

  changeHelpfulness(e) {
    let { helpfulness } = this.props.review;
    if (e.target.innerText.includes('Yes')) {
      axios.put(`/api/reviews/${this.props.review.review_id}/helpful`);
      this.setState({ helpfulClicked: true });
    } else {
      axios.put(`/api/reviews/${this.props.review.review_id}/report`);
      this.setState({ helpfulClicked: true, reported: true });
    }
  }

  hasRegisteredEmail() {
    const { email } = this.props.review;
    if (email) {
      return true;
    }
    return false;
  }

  render() {
    if (!this.props.review) {
      return <div />;
    }
    const { reviewer_name } = this.props.review;
    let checkmark = '';
    if (this.hasRegisteredEmail()) {
      checkmark = '✓ Verified Purchaser';
    }
    let starRating = 0;
    if (this.props.review.rating > 0) {
      starRating = parseFloat((Math.round(this.props.review.rating * 4) / 4).toFixed(2));
    }
    const title = this.getReviewSummary();

    return (
      <div className="rr-review-tile-container">
        <div
          className="Stars rr-review-tile-stars"
          style={{ '--rating': starRating }}
          aria-label="Rating of this product is {this.state.starRating} out of 5."
        />
        <div className="rr-tile-checkmark">
          {checkmark} {reviewer_name}, {this.getFormattedDate()}
        </div>
        <div className="rr-tile-summary">
          <b>{title}</b>
        </div>
        <div className="rr-review-body">{this.getReviewBodyHTML()}</div>
        {this.getRecommendedHTML()}
        <div className="rr-photos-div">{this.getPhotosHTML()}</div>
        {this.getResponseHTML()}
        {this.getHelpfulHTML()}
        <RRModal
          displayModal={this.state.showModal}
          closeModal={this.hidePhotoModal}
          image={this.state.modalURL}
        />
      </div>
    );
  }
}

export default ReviewTile;
