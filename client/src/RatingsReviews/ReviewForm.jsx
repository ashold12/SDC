import React from 'react';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      recommendedProduct: null,
      summaryField: '',
      reviewBody: '',
      reviewBodyCounter: 50,
    };
    this.tempTitle = 'Some product';
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    let { reviewBodyCounter } = this.state;
    if (e.target.name === 'recommendedProduct') {
      const didRecommend = (e.target.value === 'true');
      this.setState({ recommendedProduct: didRecommend });
    }
    if (e.target.name === 'textSummary') {
      this.setState({ summaryField: e.target.value });
    }
    if (e.target.name === 'reviewBody') {
      reviewBodyCounter -= 1;
      if (reviewBodyCounter <= 0) {
        reviewBodyCounter = 0;
      }
      this.setState({ reviewBody: e.target.value, reviewBodyCounter });
    }
  }

  render() {
    const { loading, summaryField, reviewBody, reviewBodyCounter } = this.state;
    const summaryPlaceHolder = 'Example: Best purchase ever!';
    const reviewBodyPlaceHolder = 'Why did you like the product or not?';
    let reviewBodyCounterText = `Minimum required characters left: ${reviewBodyCounter}`;
    if (reviewBodyCounter === 0) {
      reviewBodyCounterText = 'Minimum Reached';
    }
    if (loading) {
      return <div />;
    }
    return (
      <div className='rr-review-modal-container' >
        <h1>Write your review!</h1>
        <h2>About the {this.props.productTitle}</h2>
        <form>
          <div className='rr-review-modal-stars'>Stars go here.</div>
          Do you recommend this product?*
          <input type="radio" onChange={this.onChange} name="recommendedProduct" value="true" />
          Yes
          <input type="radio" onChange={this.onChange} name="recommendedProduct" value="false" />
          No
          <div className='rr-review-modal-summary'>
            Summary:
            <input type="text" maxLength="60" placeholder={summaryPlaceHolder} onChange={this.onChange} name="textSummary" value={summaryField} />
          </div>
          <div className='rr-review-modal-reviewbody'>
            Review:
            <textarea type="textarea" cols="40" rows="30" maxLength="1000" placeholder={reviewBodyPlaceHolder} onChange={this.onChange} name="reviewBody" value={reviewBody} />
            {reviewBodyCounterText}
          </div>
        </form>
      </div>
    )
  }
}
export default ReviewForm;
