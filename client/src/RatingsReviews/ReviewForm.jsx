import React from 'react';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      recommendedProduct: null,
      summaryField: '',
      reviewBody: ''
    };
    this.tempTitle = 'Some product';
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if (e.target.name === 'recommendedProduct') {
      const didRecommend = (e.target.value === 'true');
      this.setState({ recommendedProduct: didRecommend });
    }
    if (e.target.name === 'textSummary') {
      this.setState({ summaryField: e.target.value });
    }
    if (e.target.name === 'reviewBody') {
      this.setState({ reviewBody: e.target.value });
    }
  }

  render() {
    const { loading, summaryField, reviewBody } = this.state;
    const summaryPlaceHolder = 'Example: Best purchase ever!';
    const reviewBodyPlaceHolder = 'Why did you like the product or not?'
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
            <textarea type="textarea" cols="40" rows="30" placeholder={reviewBodyPlaceHolder} onChange={this.onChange} name="reviewBody" value={reviewBody} />
          </div>
        </form>
      </div>
    )
  }
}
export default ReviewForm;
