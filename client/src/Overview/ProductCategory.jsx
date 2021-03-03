import React from 'react';

const ProductCategory = ({ selectedProduct }) => {
  let name = 'loading';
  if (selectedProduct) {
    name = selectedProduct.category;
  }
  return <div>{name}</div>;
};

export default ProductCategory;
