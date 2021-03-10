import React from 'react';
import ProuductName from './ProductName.jsx';
import ProductPrice from './ProductPrice.jsx';
import ProductCategory from './ProductCategory.jsx';
import ReadAllReviews from './ReadAllReviews.jsx';

const ProductInfo = ({ selectedStyle, selectedProduct, starRating }) => (
  <div className="o-productInfo">
    <ReadAllReviews starRating={starRating} />
    <ProductCategory selectedProduct={selectedProduct} />
    <ProuductName selectedProduct={selectedProduct} />
    <ProductPrice selectedStyle={selectedStyle} />
  </div>
);

export default ProductInfo;
