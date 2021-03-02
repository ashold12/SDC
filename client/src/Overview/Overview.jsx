import React from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import ProductOverview from './ProductOverview.jsx'

// this is the outer holder component
class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProduct: null
    };

    // this.getSelectedImage = this.getSelectedImage.bind(this);

  }

  componentDidMount() {
    // this.getSelectedImage();
    // this.state.selectedProduct.data.results[0].photos[0].url should be the url for the image

  }

  getSelectedImage() {
    axios.get('/api/products/17762/styles')
      .then((product) => {
        console.log(product)
      })

  }

  render() {
    return (
      <div className='o-overView'>
        <ImageGallery />
        <ProductInfo />
        <ProductOverview />
        <StyleSelector />
        <AddToCart />
        <div></div>
      </div>
    );
  }
}

export default Overview;
