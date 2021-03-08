/* eslint-disable */
import React, { Component } from 'react';

class CardCarousel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="rpo-card-carousel-main">

        <div
          className={'btn prev '}>
          {'<'}
        </div>
        <div className="rpo-carousel-card-box">{this.props.cards}</div>
        <div
          className={'btn next'}>
          {'>'}
        </div>
      </div>
    );
  }
}

export default CardCarousel;
