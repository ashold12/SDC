import React from 'react';
import ProuductName from './ProductName.jsx';
import ProductPrice from './ProductPrice.jsx';

const ProductInfo = ({selectedProductStyles, selectedStyle, selectedProduct}) => {
  return (
    <div className='o-productInfo'>
      * * * * * Read all reviews
      <div>CATEGORY</div>
      <ProuductName selectedProduct={selectedProduct} />
      <ProductPrice selectedStyle={selectedStyle}/>
    </div>
  );
};

export default ProductInfo;
