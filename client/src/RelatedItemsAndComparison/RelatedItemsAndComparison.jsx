import React, { Component } from 'react';
import axios from 'axios';

import ItemCard from './ItemCard.jsx';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';
// import query from './relatedOutfitQuery.js'

class RelatedItemsAndComparison extends Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedProducts: [],
      currentProductTemp: 17762,
      productCards: [],
    };

    this.getRelated = this.getRelated.bind(this);
    this.getStyles = this.getStyles.bind(this);
  }

  componentDidMount() {
    this.getRelated(this.state.currentProductTemp);
  }

  getRelated(productID) {
    axios
      .get(`/api/products/${productID}/related`)
      .then((related) => this.getStyles(related.data))
      .then((results) => console.log(results))
      .catch((err) => console.log(err));
  }

  getStyles(relatedProductIDs) {
    const stylesPromise = relatedProductIDs.map((id) => axios.get(`api/products/${id}/styles`));
    return axios.all(stylesPromise)
      .then((styles) => console.log(styles));
  }

  render() {
    return (
      <div className="rpo-main-container">
        <RelatedProducts allProducts={this.props.allProducts} />
        {/* <YourOutfit /> */}
      </div>
    );
  }
}

export default RelatedItemsAndComparison;
