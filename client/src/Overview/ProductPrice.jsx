import React from 'react';

const ProductPrice = ({ selectedStyle }) => {
  let price = 'loading';
  if (selectedStyle) {
    if (selectedStyle.sale_price) {
      return <div id="o-sale-price">${selectedStyle.sale_price}</div>
      // price = '$' + selectedStyle.sale_price;
    } else {
      price = '$' + selectedStyle.original_price;
    }
  }

  return <div id="o-price">{price}</div>;
};

export default ProductPrice;
