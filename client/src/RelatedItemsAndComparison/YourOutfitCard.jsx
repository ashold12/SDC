/* eslint-disable */

import React from 'react';

/* pass in a check to see if its a star or not, then apply either a star or an x */
function YourOutfitCard({ selectedProduct, selectedStyle }) {
  const sale_price = selectedStyle.sale_price;
  const original_price = selectedStyle.original_price;

  const price = sale_price ? (
    <p>
      <span className="rpo-sale-price">
        {sale_price}
        {' '}
      </span>
      <span className="rpo-slashed-price">
        {original_price}
      </span>
    </p>
  )
    : (
      <p>
        {original_price}
      </p>
    );

  // const handleClick = () => {
  //   changeProduct(productInfo.id);
  // };
  return (

    <div
      className="rpo-card"
    >
      <div className="rpo-image-div">
        <img
          className="rpo-product-image"
          src={selectedStyle.photos[0].url}
          alt={selectedProduct.name}
        />
      </div>
      <div className="rpo-product-info-div">
        <p className="rpo-product-category">{selectedProduct.category}</p>
        <p className="rpo-product-info">{selectedProduct.name}</p>
        {price}
        <div className="rpo-product-rating">
          Stars
        </div>
      </div>

    </div>
  );
}

export default YourOutfitCard;
