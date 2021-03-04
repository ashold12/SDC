import React from 'react';

const ProductOverview = ({ selectedProduct }) => {
  let description = 'No information available.';
  const features = [];
  if (selectedProduct) {
    if (selectedProduct.description) {
      description = selectedProduct.description;
    }
    if (selectedProduct.features) {
      selectedProduct.features.forEach((feature) => {
        // handle duplicates in here
        features.push(feature);
      });
    }
  }

  return (
    <div className="o-productOverview">
      {features.map((feature) => {
        return <div>{feature.feature}</div>;
      })}
      <div className="o-productOverviewText">{description}</div>
    </div>
  );
};

export default ProductOverview;
