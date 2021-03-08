/* eslint-disable */
import React, { Component } from 'react';

class CardCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevDisable: true,
      nextDisable: this.refs && this.refs.offsetWidth >= this.refs.scrollWidth ? true : false,
    };
  }

  componentDidMount() {
    this.checkButtons(this.refs.offsetWidth, this.refs.scrollWidth);
  }

  checkButtons(offsetWidthValue, scrollWidthValue) {
    this.setState({
      prevDisable: this.refs.scrollLeft <= 0 ? true : false,
      nextDisable: this.refs.scrollLeft + offsetWidthValue >= scrollWidthValue ? true : false,
    });
  }

  render() {
    /* check this.props.children */
    const offsetWidthValue = this.refs.offsetWidth;
    const scrollWidthValue = this.refs.scrollWidth;
    return (
      <div
        className="rpo-card-carousel-main"
        ref={(el) => { this.refs = el; }}
      >

        <div
          className={`btn prev ${this.state.prevDisable ? 'disable' : ''}`}
          disabled={this.state.prevDisable}
          onClick={() => {
            this.refs.scrollLeft -= offsetWidthValue / 2;
            this.checkButtons(offsetWidthValue, scrollWidthValue);
          }}
        >
          {'<'}
        </div>
        <div className="rpo-carousel-card-box">{this.props.cards} {this.props.cards}</div>
        <div
          className={`btn next ${this.state.nextDisable ? 'disable' : ''}`}
          disabled={this.state.nextDisable}
          onClick={() => {
            this.refs.scrollLeft += offsetWidthValue / 2;
            this.checkButtons(offsetWidthValue, scrollWidthValue);
          }}
        >
          {'>'}
        </div>
      </div>
    );
  }
}

export default CardCarousel;
