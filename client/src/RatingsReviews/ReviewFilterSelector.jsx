import React from 'react';

class ReviewFilterSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 'relevant',
    };
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    // pass the change up to our main section and handle filters.
    this.props.passChangeToRR(e.target.value);
  }

  render() {
    const { ratings } = this.props;
    let totalReviews = 0;
    Object.keys(ratings).forEach((key) => {
      totalReviews += parseInt(ratings[key], 10);
    });
    return (
      <div className="rr-selector-form-container">
        <form>
          <label htmlFor="rr-select">
            {`${totalReviews} reviews sorted by: `}
            <select id="rr-select" value={this.state.value} onChange={this.changeHandler}>
              <option disabled>Sort on:</option>
              <option value="relevant">Relevant</option>
              <option value="helpful">Helpful</option>
              <option value="newest">Newest</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

export default ReviewFilterSelector;
