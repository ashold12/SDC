/* eslint-disable camelcase */

import React from 'react';

/* pass in a check to see if its a star or not, then apply either a star or an x */
function ItemCard({ productInfo, changeProduct, getRelated }) {
  const sale_price = productInfo.styles[1].sale_price;
  const original_price = productInfo.styles[1].original_price

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

  const handleClick = () => {
    console.log('we got here');
    changeProduct(productInfo.id);
    getRelated(productInfo.id);
  };
      console.log(productInfo.styles[1].sale_price)
  return (

    <div
      className="rpo-card"
      role="button"
      tabIndex={0}
      onKeyPress={console.log('pressed')}
      onClick={handleClick}
    >
      <div className="rpo-image-div">
        <img className="rpo-product-image"
          src={productInfo.styles[0].photos[0].url}
          alt='placeholder'
        />
      </div>
      <div className="rpo-product-info-div">
        <p className="rpo-product-category">{productInfo.category}</p>
        <p className="rpo-product-info">{productInfo.name}</p>
          {price}
        <div className="rpo-product-rating">
          Stars
        </div>
      </div>

    </div>
  );
}

export default ItemCard;
