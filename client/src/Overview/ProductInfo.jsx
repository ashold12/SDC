import React from 'react';
import ProuductName from './ProductName.jsx';
import ProductPrice from './ProductPrice.jsx';
import ProductCategory from './ProductCategory.jsx';
import ReadAllReviews from './ReadAllReviews.jsx'

const ProductInfo = ({selectedProductStyles, selectedStyle, selectedProduct}) => {
  return (
    <div className='o-productInfo'>
      <ReadAllReviews />
      <ProductCategory selectedProduct={selectedProduct}/>
      <ProuductName selectedProduct={selectedProduct} />
      <ProductPrice selectedStyle={selectedStyle}/>
    </div>
  );
};

export default ProductInfo;
