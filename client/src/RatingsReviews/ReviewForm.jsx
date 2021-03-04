import React from 'react';
import ClickableStars from './ClickableStars.jsx';
import CharacteristicsRadioButtonSet from './CharacteristicsRadioButtonSet.jsx';
import axios from 'axios';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.metaData = props.metaData;
    this.state = {
      loading: false,
      recommendedProduct: null,
      summaryField: '',
      reviewBody: '',
      reviewBodyCounter: 50,
      nickName: '',
      email: '',
      photos: [],
      starRating: null,
      starRatingString: '',
      characteristics: {},
      formError: '',
    };
    this.tempTitle = 'Some product';
    this.onChange = this.onChange.bind(this);
    this.postReview = this.postReview.bind(this);
  }

  componentDidMount() {
    const charObj = {};
    Object.keys(this.metaData.characteristics).forEach((key) => {
      charObj[key] = null;
    });
    this.setState({ characteristics: charObj });
  }

  onChange(e) {
    let { reviewBodyCounter } = this.state;
    if (e.target.name === 'recommendedProduct') {
      const didRecommend = e.target.value === 'true';
      this.setState({ recommendedProduct: didRecommend });
    }
    if (e.target.name === 'textSummary') {
      this.setState({ summaryField: e.target.value });
    }
    if (e.target.name === 'reviewBody') {
      reviewBodyCounter = e.target.value.length - 50;
      if (reviewBodyCounter >= 0) {
        reviewBodyCounter = 0;
      }

      this.setState({ reviewBody: e.target.value, reviewBodyCounter });
    }
    if (e.target.name === 'nickName') {
      this.setState({ nickName: e.target.value });
    }
    if (e.target.name === 'email') {
      this.setState({ email: e.target.value });
    }
    if (e.target.name === 'photoUpload') {
      const { photos } = this.state;
      const photoUrl = URL.createObjectURL(e.target.files[0]);
      e.target.value = '';
      photos.push(photoUrl);
      this.setState({ photos });
    }
    if (e.target.name === 'rating') {
      this.setStarRatingString(e.target.value);
    }
    if (e.target.name.includes('characteristic')) {
      const characteristic = e.target.name.split('-')[1];
      // This is complaining but with destructuring it didn't work.
      const charObj = { ...this.state.characteristics };
      charObj[characteristic] = e.target.value;
      this.setState({ characteristics: charObj });
    }
  }

  setStarRatingString(value) {
    const possibleStrings = ['Poor', 'Fair', 'Average', 'Good', 'Great'];
    this.setState({ starRatingString: possibleStrings[value - 1], starRating: value });
  }

  postReview() {
    if (this.formIsValid()) {
      let { product_id } = this.props.metaData;
      product_id = parseInt(product_id, 10);
      const processedObj = {};
      Object.keys(this.metaData.characteristics).forEach((key) => {
        const { id } = this.metaData.characteristics[key];
        processedObj[id] = parseInt(this.state.characteristics[key], 10);
      });
      console.log(processedObj);
      const {
        recommendedProduct,
        reviewBody,
        nickName,
        email,
        starRating,
        photos,
        summaryField,
      } = this.state;

      const reviewData = {
        product_id,
        rating: parseInt(starRating, 10),
        summary: summaryField,
        body: reviewBody,
        recommend: recommendedProduct,
        name: nickName,
        email,
        photos,
        characteristics: processedObj,
      };
      this.setState({ formError: '' });
      axios
        .post('/api/reviews/', reviewData)
        .then((data) => {
          //Close the form
        })
        .catch((e) => {
          //Close the form.
        });
    }
  }

  formIsValid() {
    const {
      recommendedProduct,
      reviewBody,
      nickName,
      email,
      starRating,
      characteristics,
      reviewBodyCounter,
    } = this.state;
    if (recommendedProduct === null) {
      this.setState({ formError: 'Recommended product is required.' });
      return false;
    }
    if (!reviewBody || reviewBodyCounter !== 0) {
      this.setState({ formError: 'A minimum of 50 characters is required.' });
      return false;
    }
    if (!nickName) {
      this.setState({ formError: 'Nickname is a required.' });
      return false;
    }
    if (!this.isValidEmailAddress(email)) {
      this.setState({ formError: 'E-mail is required.' });
      return false;
    }
    if (!starRating) {
      this.setState({ formError: 'Star rating is required.' });
      return false;
    }
    Object.keys(characteristics).forEach((key) => {
      if (!characteristics[key]) {
        this.setState({ formError: 'Product characteristics are required.' });
        return false;
      }
    });
    return true;
  }

  isValidEmailAddress(email) {
    // This is some regex magic https://ui.dev/validate-email-address-javascript/
    return /\S+@\S+\.\S+/.test(email);
  }

  render() {
    const {
      loading,
      summaryField,
      reviewBody,
      reviewBodyCounter,
      email,
      nickName,
      photos,
      starRatingString,
      formError,
    } = this.state;
    const summaryPlaceHolder = 'Example: Best purchase ever!';
    const reviewBodyPlaceHolder = 'Why did you like the product or not?';
    let reviewBodyCounterText = `Minimum required characters left: ${Math.abs(reviewBodyCounter)}`;
    if (reviewBodyCounter === 0) {
      reviewBodyCounterText = 'Minimum Reached';
    }
    const photosJSX = photos.map((photo) => (
      <img
        key={photo}
        className="rr-modal-form-thumbnail"
        src={photo}
        alt="User submitted of product"
      />
    ));
    let submitPhotoButton = <div />;
    if (photos.length < 5) {
      submitPhotoButton = (
        <input type="file" accept="image/*" name="photoUpload" onChange={this.onChange} />
      );
    }
    const modalClassName = this.props.showModal
      ? 'rr-review-modal rr-form-display-block'
      : 'rr-review-modal rr-form-display-none';
    if (loading) {
      return <div />;
    }

    const characteristicRB = Object.keys(this.metaData.characteristics).map((char) => (
      <CharacteristicsRadioButtonSet
        characteristic={char}
        key={this.metaData.characteristics[char].id}
        changeHandler={this.onChange}
      />
    ));

    return (
      <div className={`${modalClassName}`}>
        <section className="rr-review-modal-main">
          <h1>Write your review!</h1>
          <h2>About the {this.props.productTitle}</h2>
          <form>
            <div className="rr-review-modal-stars">
              <ClickableStars onChange={this.onChange} ratingString={starRatingString} />
            </div>
            {characteristicRB}
            Do you recommend this product?*
            <input type="radio" onChange={this.onChange} name="recommendedProduct" value="true" />
            Yes
            <input type="radio" onChange={this.onChange} name="recommendedProduct" value="false" />
            No
            <div className="rr-review-modal-nickname">
              Nickname:*{' '}
              <input
                type="text"
                maxLength="60"
                name="nickName"
                value={nickName}
                onChange={this.onChange}
              />
              <br />
              For privacy reasons do not use your full name or e-mail address.
            </div>
            <div className="rr-reviw-modal-email">
              E-Mail*:{' '}
              <input
                type="email"
                maxLength="60"
                name="email"
                value=""
                onChange={this.onChange}
                value={email}
              />
              <div className="rr-review-modal-email-info">
                For authentication reasons, you will not be emailed.
              </div>
            </div>
            <div className="rr-review-modal-summary">
              Summary:
              <input
                type="text"
                size="60"
                maxLength="60"
                placeholder={summaryPlaceHolder}
                onChange={this.onChange}
                name="textSummary"
                value={summaryField}
              />
            </div>
            <div className="rr-review-modal-reviewbody">
              Review:
              <textarea
                type="textarea"
                cols="40"
                rows="30"
                maxLength="1000"
                placeholder={reviewBodyPlaceHolder}
                onChange={this.onChange}
                name="reviewBody"
                value={reviewBody}
              />
              {reviewBodyCounterText}
            </div>
            <div className="rr-modal-photo-thumbnails-container">{photosJSX}</div>
            <div className="rr-modal-photo-upload">{submitPhotoButton}</div>
          </form>
          <button name="submitButton" onClick={this.postReview} type="button">
            Submit
          </button>
          {formError}
        </section>
      </div>
    );
  }
}
export default ReviewForm;
