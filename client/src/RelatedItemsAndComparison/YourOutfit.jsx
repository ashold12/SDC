import React from 'react';
import CardCarousel from './CardCarousel.jsx';

function YourOutfit({ cards }) {
  return (
    <div className="rpo-card-carousel-container">
      <CardCarousel cards={cards} />
    </div>
  );
}

export default YourOutfit;
