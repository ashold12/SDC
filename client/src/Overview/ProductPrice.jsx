import React from 'react';

const ProductPrice = ({ selectedStyle }) => {
  let price = 'loading';
  if (selectedStyle) {
    if (selectedStyle.sale_price) {
      price = selectedStyle.sale_price;
    } else {
      price = selectedStyle.original_price;
    }
  }

  return <div>{price}</div>;
};

export default ProductPrice;
