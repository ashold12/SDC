import React from 'react';

function YourOutfit({ cards }) {
  return (
    <div>
      <div className="rpo-title-div">Related Products</div>
      <div className="rpo-card-container">{cards}</div>
    </div>
  );
}

export default YourOutfit;
