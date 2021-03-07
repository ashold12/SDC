import React from 'react';
import CardCarousel from './CardCarousel.jsx';

function RelatedProducts({ cards }) {
  return (
    <div className="rpo-title-and-card-container" name="Container">
      <div className="rpo-title-div" name="H1">Related Products</div>
      <div className="rpo-card-container" name="HorizontalCenter">{cards}</div>
    </div>
  );
}

export default RelatedProducts;
