import React from 'react';

const ProductCategory = ({ selectedProduct }) => {
  let name = 'loading';
  if (selectedProduct) {
    name = selectedProduct.category;
  }
  return <div id="o-category">{name}</div>;
};

export default ProductCategory;
