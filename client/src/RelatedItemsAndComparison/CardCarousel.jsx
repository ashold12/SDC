/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable */
import React, { Component } from 'react';

const numArr = [0,1,2,3,4,5,6,7,8];


class CardCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIdx: 0,
      activeCards: this.props.cards.slice(0, this.props.displayNum),
      numActive: numArr.slice(0, this.props.displayNum),
      prev: { visibility: 'hidden' },
      next: { visibility: 'hidden' },
    };
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    const { cards, displayNum } = this.props;

    if (cards.length > displayNum) {
      this.setState({
        next: { visibility: 'visible' },
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { displayNum, cards } = this.props;
    const { activeIdx } = this.state;

    if (this.props.cards !== prevProps.cards) {
      this.setState({ activeCards: this.props.cards.slice(activeIdx, activeIdx + this.props.displayNum) });
            if (cards.length > displayNum) {
        this.setState({
          next: { visibility: 'visible' },
        });
      }
    }


  }

  prev() {
    const { displayNum, cards } = this.props;
    const { activeIdx } = this.state;
    const maxed = this.state.next.visibility === 'hidden' && cards.length > 4 ? true : false;

    if (this.state.activeIdx - displayNum <= 0) {
      this.setState({
        activeIdx: 0,
        prev: { visibility: 'hidden' },
        next: { visibility: 'visible' },
        activeCards: cards.slice(0, displayNum),
        numActive: numArr.slice(0, displayNum),
      });
    } else {
      this.setState((prevState, props) => ({

        activeCards: cards.slice(prevState.activeIdx - displayNum, prevState.activeIdx),
        numActive: numArr.slice(prevState.activeIdx - displayNum, prevState.activeIdx),
        activeIdx: prevState.activeIdx - props.displayNum,
        next: { visibility: 'visible' },
      }));
    }
  }

  next() {
    const { displayNum, cards } = this.props;
    const { activeIdx } = this.state;
    const nextActiveIdx = activeIdx + displayNum;



    if (nextActiveIdx + displayNum > cards.length) {
      this.setState({ next: { visibility: 'hidden' }, })
    }
    this.setState((prevState, props) => ({

      prev: { visibility: 'visible' },
      activeIdx: prevState.activeIdx + displayNum,

      activeCards: cards.slice(nextActiveIdx, nextActiveIdx + displayNum),
      numActive: numArr.slice(nextActiveIdx, nextActiveIdx + displayNum),
    }))


  }

  render() {
    const { activeCards } = this.state;
    return (
      <div
        className="rpo-card-carousel-main">

        <div
          className="btn prev"
          style={this.state.prev}
          onClick={this.prev}
        >
          {'<'}
        </div>
        <div className="rpo-carousel-card-box">{activeCards}</div>
        <div
          className="btn next"
          style={this.state.next}
          onClick={this.next}
        >
          {'>'}
        </div>
      </div>
    );
  }
}

export default CardCarousel;
