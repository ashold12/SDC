/* eslint-disable react/no-unused-state */
/* eslint-disable class-methods-use-this */
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
      relatedID: [],
      productStyles: [],
      productInformation: [],
      currentProduct: this.props.selectedProduct ? this.props.selectedProduct.id : 17762,
      // currentProduct: 17762,
      relatedProductCards: [],
      yourOutfit: [],
    };

    this.getRelated = this.getRelated.bind(this);
    this.getRelatedStyles = this.getRelatedStyles.bind(this);
    this.setCards = this.setCards.bind(this);
  }

  componentDidMount() {
    // this.setState({ currentProduct: this.props.selectedProduct });
    this.getRelated(this.state.currentProduct);
  }

  getRelated(productID) {
    axios
      .get(`/api/products/${productID}/related`)
      .then((related) => this.setState({ relatedID: related.data }))
      .then(() => this.getRelatedStyles(this.state.relatedID))
      .then((styles) => this.setState({ productStyles: styles }))
      .then(() => this.getRelatedInfo(this.state.relatedID))
      .then((infoData) => this.setState({ productInformation: infoData }))
      .then(() => this.setCards())
      .then((cards) => this.setState({ relatedProductCards: cards }))
      .catch((err) => console.log(err));
  }

  getRelatedStyles(relatedProductIDs) {
    const stylesPromise = relatedProductIDs.map((id) => axios.get(`api/products/${id}/styles`));
    return axios.all(stylesPromise)
      .then((styles) => styles.map((style) => style.data.results));
  }

  getRelatedInfo(relatedProductIDs) {
    const infoPromise = relatedProductIDs.map((id) => axios.get(`api/products/${id}`));
    return axios.all(infoPromise)
      .then((infos) => infos.map((info) => info.data));
  }

  setCards() {
    const cardInfo = this.state.productInformation.map((product, idx) => {
      const newProduct = JSON.parse(JSON.stringify(product));
      newProduct.styles = this.state.productStyles[idx];
      return (
        <ItemCard
          productInfo={newProduct}
          changeProduct={this.props.changeProduct}
          getRelated={this.getRelated}
          key={newProduct.id}
        />
      );
    });
    return cardInfo;
  }

  render() {
    return (
      <div className="rpo-main-container">
        <RelatedProducts cards={this.state.relatedProductCards} />
        <YourOutfit cards={this.state.relatedProductCards} />
      </div>
    );
  }
}

export default RelatedItemsAndComparison;
