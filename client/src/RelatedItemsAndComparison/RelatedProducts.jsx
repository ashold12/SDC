import React from 'react';
import CardCarousel from './CardCarousel.jsx';

function RelatedProducts({ cards }) {
  return (
    <div className="rpo-card-carousel-container">
      <CardCarousel cards={cards} />
    </div>
  );
}

export default RelatedProducts;
