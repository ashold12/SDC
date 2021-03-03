import React from 'react';
import ItemCard from './ItemCard.jsx';

function RelatedProducts() {
  return (
    <div className="rpo-related-main-container">
      <div>RELATED PRODUCTS</div>
      <div className="rpo-card-holder">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
    </div>
  );
}

export default RelatedProducts;
