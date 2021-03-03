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
      relatedStyles: [],
      currentProductTemp: 17762,
      productCards: [],
    };

    this.getRelated = this.getRelated.bind(this);
    this.getStyles = this.getRelatedStyles.bind(this);
  }

  componentDidMount() {
    this.getRelated(this.state.currentProductTemp);
  }

  getRelated(productID) {
    axios
      .get(`/api/products/${productID}/related`)
      .then((related) => this.getRelatedStyles(related.data))
      .then((results) => this.setState({ relatedStyles: results }))
      .then(() => console.log(this.state.relatedStyles))
      .catch((err) => console.log(err));
  }

  getRelatedStyles(relatedProductIDs) {
    const stylesPromise = relatedProductIDs.map((id) => axios.get(`api/products/${id}/styles`));
    return axios.all(stylesPromise)
      .then((styles) => styles.map((style) => style.data));
  }

  setCards() {

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
