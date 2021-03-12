/* eslint-disable */

import React from 'react';

/* pass in a check to see if its a star or not, then apply either a star or an x */
function ItemCard({ productInfo, changeProduct }) {
  const sale_price = productInfo.styles[0].sale_price;
  const original_price = productInfo.styles[0].original_price
  // debugger;
  const price = sale_price ? (
    <p className="rpo-price">
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
      <p className="rpo-price">
        {original_price}
      </p>
    );

  const handleClick = () => {
    changeProduct(productInfo.id);
  };

  const src = productInfo.styles[0].photos[0].url ? productInfo.styles[0].photos[0].url : 'https://www.mypokecard.com/en/Gallery/my/galery/RLJ0O5wPFEpu.jpg';

  return (

    <div
      className="rpo-card"
      role="button"
      tabIndex={0}
      // onKeyPress={console.log('pressed')}
      onClick={handleClick}
    >
      <div className="rpo-image-div">
        <img
          className="rpo-product-image"
          src={src}
          alt={productInfo.name}
        />
      </div>
      <div className="rpo-product-info-div">
        <p className="rpo-product-category">{productInfo.category}</p>
        <p className="rpo-product-info">{productInfo.name}</p>
        {price}
        <div className="rpo-product-rating Stars">
          <div className="Stars" style={{'--rating': productInfo.rating}}></div>
        </div>
      </div>

    </div>
  );
}

export default ItemCard;
