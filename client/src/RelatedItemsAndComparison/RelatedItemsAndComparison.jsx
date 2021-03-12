/* eslint-disable no-prototype-builtins */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import axios from 'axios';

import ItemCard from './ItemCard.jsx';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';
import YourOutfitCard from './YourOutfitCard.jsx';
import RPOLoader from './RPOLoader.jsx';

const cancelTokenSource = axios.CancelToken.source();

class RelatedItemsAndComparison extends Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedID: [],
      productStyles: [],
      relatedProductInformation: [],
      currentProduct: this.props.selectedProduct.id,
      relatedProductCards: [],
      yourOutfit: {},
      relatedRatings: [],
      loading: true,
    };

    this.getRelated = this.getRelated.bind(this);
    this.getRelatedStyles = this.getRelatedStyles.bind(this);
    this.setCards = this.setCards.bind(this);
    this.updateYourOutfit = this.updateYourOutfit.bind(this);
    this.makeCardForOutfit = this.makeCardForOutfit.bind(this);
    this.changeCurrentProduct = this.changeCurrentProduct.bind(this);
  }

  componentDidMount() {
    this.getRelated(this.state.currentProduct);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedProduct.id !== prevProps.selectedProduct.id) {
      this.changeCurrentProduct();
      this.getRelated(this.state.currentProduct);
    }
  }

  componentWillUnmount() {
    cancelTokenSource.cancel('Component Re-mounting...');
    this.setState({ loading: true });
  }

  getRelated(productID) {
    this.setState({ loading: true });
    axios
      .get(`/api/products/${productID}/related`, {
        cancelToken: cancelTokenSource.token,
      })
      .then((related) => {
        const tempRelatedID = new Set(related.data);
        if (tempRelatedID.has(this.state.currentProduct)) {
          tempRelatedID.delete(this.state.currentProduct);
        }
        this.setState({ relatedID: [...tempRelatedID] });
      })
      .then(() => this.getRelatedStyles(this.state.relatedID))
      .then((styles) => this.setState({ productStyles: styles }))
      .then(() => this.getRelatedRating(this.state.relatedID))
      .then((ratings) => this.setState({ relatedRatings: ratings }))
      .then(() => this.getRelatedInfo(this.state.relatedID))
      .then((infoData) => this.setState({ relatedProductInformation: infoData }))
      .then(() => this.setCards())
      .then((cards) => this.setState({ relatedProductCards: cards }))
      .then(() => this.setState({ loading: false }))
      .catch((err) => console.log(err));
  }

  getRelatedStyles(relatedProductIDs) {
    const stylesPromise = relatedProductIDs.map((id) => axios.get(`api/products/${id}/styles`, {
      cancelToken: cancelTokenSource.token,
    }));
    return axios.all(stylesPromise)
      .then((styles) => styles.map((style) => style.data.results));
  }

  getRelatedRating(relatedProductIDs) {
    const ratingsPromise = relatedProductIDs.map((id) => axios.get(`/api/reviews/meta?product_id=${id}`, {
      cancelToken: cancelTokenSource.token,
    }));
    return axios.all(ratingsPromise)
      .then((metaInfo) => metaInfo.map((metaInfo) => {
        const { ratings } = metaInfo.data;
        let totalRatingScore = 0;
        let totalNumberOfRatings = 0;
        Object.keys(ratings).forEach((key) => {
          totalRatingScore += parseInt(key, 10) * ratings[key];
          totalNumberOfRatings += parseInt(ratings[key], 10);
        });
        return (totalRatingScore / totalNumberOfRatings).toFixed(2);
      }));
  }

  getRelatedInfo(relatedProductIDs) {
    const infoPromise = relatedProductIDs.map((id) => axios.get(`api/products/${id}`, {
      cancelToken: cancelTokenSource.token,
    }));
    return axios.all(infoPromise)
      .then((infos) => infos.map((info) => info.data));
  }

  setCards() {
    const cardInfo = this.state.relatedProductInformation.map((product, idx) => {
      const newProduct = { ...product };
      newProduct.styles = this.state.productStyles[idx];
      newProduct.rating = this.state.relatedRatings[idx];
      return (
        <ItemCard
          productInfo={newProduct}
          changeProduct={this.props.changeProduct}
          key={newProduct.id}
        />
      );
    });
    return cardInfo;
  }

  changeCurrentProduct() {
    this.setState({ currentProduct: this.props.selectedProduct.id })
  }

  updateYourOutfit(removeIDFromOutfit) {
    if (removeIDFromOutfit) {
      const currentOutfit = { ...this.state.yourOutfit };
      delete currentOutfit[removeIDFromOutfit];
      this.setState({ yourOutfit: currentOutfit });
    } else if (!this.state.yourOutfit.hasOwnProperty(this.props.selectedProduct.id)) {
      const currentOutfit = { ...this.state.yourOutfit };
      currentOutfit[this.props.selectedProduct.id] = this.makeCardForOutfit();
      this.setState({ yourOutfit: currentOutfit });
    }
  }

  makeCardForOutfit() {
    return (
      <YourOutfitCard
        selectedProduct={this.props.selectedProduct}
        selectedStyle={this.props.selectedStyle}
        selectedRating={this.props.starRating}
        key={this.props.selectedProduct.id}
      />
    );
  }

  render() {
    if (this.state.loading) {
      return <RPOLoader />;
    }
    return (
      <div className="rpo-main-container">
        <div className="rpo-title-div">Related Products</div>
        <RelatedProducts cards={this.state.relatedProductCards} />
        <div className="rpo-title-div">Your Outfits</div>
        <YourOutfit
          cards={this.state.yourOutfit}
          addCurrentProductToOutfit={this.updateYourOutfit}
          darkMode={this.props.darkMode}
        />
      </div>
    );
  }
}

export default RelatedItemsAndComparison;
