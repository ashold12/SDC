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
        if (features.indexOf(feature.feature) === -1) {
          features.push(feature.feature);
        }
      });
    }
  }

  return (
    <div className="o-productOverview">
      <div className="o-productOverviewChecks">
        {features.map((feature) => (
          <div key={feature}> ✓ {feature}</div>
        ))}
      </div>
      <div className="o-productOverviewText">{description}</div>
    </div>
  );
};

export default ProductOverview;
