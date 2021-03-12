import React, { Component } from 'react';
import CardCarousel from './CardCarousel.jsx';
import AddOutfitCard from './AddOutfitCard.jsx';

class YourOutfit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
    };
  }

  componentDidMount() {
    const { cards } = this.props;
    this.setState({ cards: Object.values(cards) });
  }

  componentDidUpdate(prevProps) {
    if (this.props.cards !== prevProps.cards) {
      const newCards = Object.values(this.props.cards);
      this.setState({ cards: newCards });
    }
  }

  render() {
    return (
      <div className="rpo-add-outfit-container">
        <AddOutfitCard
          addCurrentProductToOutfit={this.props.addCurrentProductToOutfit}
          darkMode={this.props.darkMode}
        />
        <CardCarousel cards={this.state.cards} displayNum={4} />
      </div>
    );
  }
}

export default YourOutfit;
