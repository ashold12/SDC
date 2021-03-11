import React from 'react';
import CardCarousel from './CardCarousel.jsx';

function RelatedProducts({ cards }) {
  return (
    <div className="rpo-card-carousel-container">
      <CardCarousel
        cards={cards}
        displayNum={4}
      />
    </div>
  );
}

export default RelatedProducts;
