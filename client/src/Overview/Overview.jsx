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
      // selectedProduct: null,
      selectedProductStyles: [],
      selectedStyle: null // set the first style as default
    };

    this.getProductStyles = this.getProductStyles.bind(this);
    // this.getProduct = this.getProduct.bind(this);
    this.selectStyleThumbnail = this.selectStyleThumbnail.bind(this);
  }

  componentDidMount() {
    this.getProductStyles();
    // this.getProduct();
  }

  // getProduct() {
  //   axios.get('api/products/17762')
  //     .then((product) => {
  //       // update state in App component with function here
  //       this.setState({
  //         selectedProduct: product.data
  //       });
  //     });
  // }

  getProductStyles() {
    axios.get('/api/products/17762/styles')
      .then((product) => {
        this.setState({
          selectedProductStyles: product.data.results,
          selectedStyle: product.data.results[0] // sets first style to default style for now
        });
      });
  }

  selectStyleThumbnail(style) {
    this.setState({selectedStyle: style})

  }

  render() {
    const { selectedProductStyles, selectedStyle } = this.state;
    const { selectedProduct } = this.props;
    return (
      <div>
      <div className='o-overView'>
        <ImageGallery />
        <ProductInfo selectedProductStyles={selectedProductStyles} selectedStyle={selectedStyle} selectedProduct={selectedProduct}/>
        <StyleSelector selectedProductStyles={selectedProductStyles} selectedStyle={selectedStyle} selectStyleThumbnail={this.selectStyleThumbnail} selectedStyle={selectedStyle}/>
        <AddToCart selectedProductStyles={selectedProductStyles} selectedStyle={selectedStyle} selectedProduct={selectedProduct}/>
      </div>
      <ProductOverview selectedProduct={selectedProduct}/>
      </div>
    );
  }
}

export default Overview;
