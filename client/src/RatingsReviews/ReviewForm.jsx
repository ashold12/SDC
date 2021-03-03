import React from 'react';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      recommendedProduct: null,
      summaryField: '',
    };
    this.tempTitle = 'Some product';
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if (e.target.name === 'recommendedProduct') {
      const didRecommend = (e.target.value === 'true');
      this.setState({ recommendedProduct: didRecommend });
    }
  }

  render() {
    const { loading, summaryField } = this.state;
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
          <input type="radio" onChange={this.onChange} name="recommendedProduct" value="true" />Yes
          <input type="radio" onChange={this.onChange} name="recommendedProduct" value="false" />No
        </form>
      </div>
    )
  }
}
export default ReviewForm;
