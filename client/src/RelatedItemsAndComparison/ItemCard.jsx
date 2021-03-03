import React from 'react';

/* pass in a check to see if its a star or not, then apply either a star or an x */
function ItemCard() {
  return (
    <div className="rpo-item-card">
      <div className="rpo-item-card-img">Image</div>
      <div className="rpo-item-card-info">
        <div>Category</div>
        <div>Expanded Product Name</div>
        <div>Price</div>
        <div>Stars</div>
      </div>
    </div>
  );
}

export default ItemCard;
