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
      currentProductTemp: 17762,
      productCards: [],
    };

    this.getRelated = this.getRelated.bind(this);
    this.getRelatedStyles = this.getRelatedStyles.bind(this);
    this.setCards = this.setCards.bind(this);
  }

  componentDidMount() {
    this.getRelated(this.state.currentProductTemp);
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
      .then((cards) => this.setState({ productCards: cards }))
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
      // console.log(newProduct);
      return (
        <ItemCard
          productInfo={product}
          productStyle={this.state.productStyles[idx]}
          key={this.state.relatedID[idx]}
        />
      );
    });
    return cardInfo;
  }

  render() {
    return (
      <div className="rpo-main-container">
        <RelatedProducts />
        {/* <YourOutfit /> */}
      </div>
    );
  }
}

export default RelatedItemsAndComparison;
