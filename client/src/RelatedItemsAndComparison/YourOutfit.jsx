import React from 'react';
import CardCarousel from './CardCarousel.jsx';

function YourOutfit({ cards, addOutfitCard }) {
  const cardSet = Object.values(cards);
  cardSet.unshift(addOutfitCard);
  return (
    <div className="rpo-card-carousel-container">
      {/* <CardCarousel cards={Object.values(cards)} /> */}
      <CardCarousel cards={cardSet} />
    </div>
  );
}

export default YourOutfit;
