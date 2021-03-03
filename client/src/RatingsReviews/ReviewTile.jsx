import React from 'react';
import RRModal from './PhotoModal.jsx';
import dummyReviews from './dummyReviews';

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
    if (props.review.rating > 0) {
      props.review.starRating = parseFloat((Math.round(props.review.rating * 4) / 4).toFixed(2));
    }
    this.state = {
      ...props.review,
      showModal: false,
      modalURL: '',
      helpfulClicked: false,
    };
    this.showMoreReview = this.showMoreReview.bind(this);
    this.showPhotoModal = this.showPhotoModal.bind(this);
    this.hidePhotoModal = this.hidePhotoModal.bind(this);
    this.changeHelpfulness = this.changeHelpfulness.bind(this);
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

  getPhotosHTML() {
    const { photos } = this.state;
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

  getRecommendedHTML() {
    if (this.state.recommend) {
      return <div className="rr-recommended">✓ I recommend this product.</div>;
    }
  }

  showPhotoModal(e) {
    this.setState({ showModal: true, modalURL: e.target.src });
  }

  getResponseHTML() {
    if (this.state.response) {
      return (
        <div className="rr-staff-response">
          Response from seller
          <div>{this.state.response}</div>
        </div>
      );
    }
  }

  getHelpfulHTML() {
    const { helpfulness, helpfulClicked } = this.state;
    if (!helpfulClicked) {
      return (
        <div className="rr-helpfulness">
          Was this review helpful?
          {/*eslint-disable*/
          /*using link as button per spec*/}
          <a href="#" className="rr-helpfulness-link" onClick={this.changeHelpfulness}>
            {/*eslint-disable*/
            /*wants to change parens*/}
            Yes ({helpfulness})
          </a>
          {' | '}
          <a href="#" className="rr-helpfulness-link" onClick={this.changeHelpfulness}>
            No
          </a>
          {/* eslint-enable */}
        </div>
      );
    }
    return <div className="rr-helpfulness">{helpfulness} users found this review helpful.</div>;
  }

  showMoreReview() {
    const { body, review_id } = this.state;
    const bodyText = document.getElementById(review_id);
    bodyText.innerText = body;
  }

  hidePhotoModal() {
    this.setState({ showModal: false, modalURL: '' });
  }

  changeHelpfulness(e) {
    let { helpfulness } = this.state;
    if (e.target.innerText.includes('Yes')) {
      // FIXME: hit the api and adjust the rating.
      this.setState({ helpfulness: (helpfulness += 1), helpfulClicked: true });
    } else {
      // FIXME: According to docs we don't remove helpfulness only update and increment it.
      this.setState({ helpfulClicked: true });
    }
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
      checkmark = '✓ Verified Purchaser';
    }

    const title = this.getReviewSummary();

    return (
      <div className="rr-review-tile-container">
        <div
          className="Stars rr-review-tile-stars"
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
