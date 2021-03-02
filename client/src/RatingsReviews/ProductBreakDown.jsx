import React from 'react';

class ProductBreakDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 17762,
      chars: props.characteristics,
    };
    console.log(props.characteristics);
  }

  render() {
    return (
      <div className="rr-product-breakdown">
        breakdown is here
      </div>
    );
  }
}

export default ProductBreakDown;
