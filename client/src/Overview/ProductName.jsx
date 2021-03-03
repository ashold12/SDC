import React from 'react';

const ProuductName = ({ selectedProduct }) => {
  let name = 'loading';
  if (selectedProduct) {
    name = selectedProduct.name;
  }
  return <div>{name}</div>;
};

export default ProuductName;
