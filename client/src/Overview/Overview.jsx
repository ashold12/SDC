import React from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector.jsx';
import SizeSelector from './SizeSelector.jsx';
import QuantitySelector from './QuantitySelector.jsx';
import AddToCart from './AddToCart.jsx';

// this is the outer holder component
class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProduct: null
    };

    this.getSelectedImage = this.getSelectedImage.bind(this);

  }

  componentDidMount() {
    this.getSelectedImage();
    // this.state.selectedProduct.data.results[0].photos[0].url should be the url for the image

  }

  getSelectedImage() {
    axios.get('/api/products/17762/styles')
      .then((product) => {
        console.log(product.data.results[0].photos[0].url)
        this.setState({
          selectedProduct: product
        })
      })

  }

  render() {
    return (
      <div>
        <ImageGallery />
        <ProductInfo />
        <StyleSelector />
        <SizeSelector />
        <QuantitySelector />
        <AddToCart />
      </div>
    );
  }
}

export default Overview;
