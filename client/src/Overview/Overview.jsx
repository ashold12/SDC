import React from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import ProductOverview from './ProductOverview.jsx';

// this is the outer holder component
class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProduct: null,
      selectedProductStyles: [],
      selectedStyle: null // set the first style as default
    };

    this.getProductStyles = this.getProductStyles.bind(this);
    this.getProduct = this.getProduct.bind(this);
  }

  componentDidMount() {
    this.getProductStyles();
    this.getProduct();
  }

  getProduct() {
    axios.get('api/products/17762')
      .then((product) => {
        this.setState({
          selectedProduct: product.data
        });
      });
  }

  getProductStyles() {
    axios.get('/api/products/17762/styles')
      .then((product) => {
        this.setState({
          selectedProductStyles: product.data.results,
          selectedStyle: product.data.results[0] // sets first style to default style for now
        });
      });
  }

  render() {
    const { selectedProductStyles, selectedStyle, selectedProduct } = this.state;
    return (
      <div>
      <div className='o-overView'>
        <ImageGallery />
        <ProductInfo selectedProductStyles={selectedProductStyles} selectedStyle={selectedStyle} selectedProduct={selectedProduct}/>
        <StyleSelector selectedProductStyles={selectedProductStyles} selectedStyle={selectedStyle}/>
        <AddToCart />
      </div>
      <ProductOverview selectedProduct={selectedProduct}/>
      </div>
    );
  }
}

export default Overview;
