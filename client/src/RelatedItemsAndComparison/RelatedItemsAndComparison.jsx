/* eslint-disable */

import React, { Component } from 'react';
import axios from 'axios';

import ItemCard from './ItemCard.jsx';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';
import AddOutfitCard from './AddOutfitCard.jsx';
// import query from './relatedOutfitQuery.js'

const cancelTokenSource = axios.CancelToken.source();

class RelatedItemsAndComparison extends Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedID: [],
      outfitID: new Set(),
      productStyles: [],
      relatedProductInformation: [],
      currentProduct: this.props.selectedProduct.id,
      relatedProductCards: [],
      yourOutfitCards: [<AddOutfitCard addCurrentProductToOutfit={this.updateYourOutfitSet} />],
      loading: true,
    };

    this.getRelated = this.getRelated.bind(this);
    this.getRelatedStyles = this.getRelatedStyles.bind(this);
    this.setCards = this.setCards.bind(this);
    this.updateYourOutfitSet = this.updateYourOutfitSet.bind(this);
  }

  componentDidMount() {
    // this.setState({ currentProduct: this.props.selectedProduct });
    // this.setState({ yourOutfitCards: [<AddOutfitCard addCurrentProductToOutfit={this.addCurrentProductToOutfit} />]})
    this.getRelated(this.state.currentProduct);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedProduct.id !== prevProps.selectedProduct.id){
      this.setState({ currentProduct: this.props.selectedProduct.id })
      this.getRelated(this.state.currentProduct);
    }
  }

  componentWillUnmount() {
    cancelTokenSource.cancel('Component Re-mounting...');
    this.setState({ loading: true })
 }

  getRelated(productID) {
    this.setState({ loading: true });
    axios
      .get(`/api/products/${productID}/related`, {
        cancelToken: cancelTokenSource.token
      })
      .then((related) => this.setState({ relatedID: related.data }))
      .then(() => this.getRelatedStyles(this.state.relatedID))
      .then((styles) => this.setState({ productStyles: styles }))
      .then(() => this.getRelatedInfo(this.state.relatedID))
      .then((infoData) => this.setState({ relatedProductInformation: infoData }))
      .then(() => this.setCards())
      .then((cards) => this.setState({ relatedProductCards: cards }))
      .then(() => this.setState({ loading: false }))
      .catch((err) => console.log(err));
  }

  getRelatedStyles(relatedProductIDs) {
    const stylesPromise = relatedProductIDs.map((id) => axios.get(`api/products/${id}/styles`, {
      cancelToken: cancelTokenSource.token
    }));
    return axios.all(stylesPromise)
      .then((styles) => styles.map((style) => style.data.results));
  }

  getRelatedInfo(relatedProductIDs) {
    const infoPromise = relatedProductIDs.map((id) => axios.get(`api/products/${id}`, {
      cancelToken: cancelTokenSource.token
    }));
    return axios.all(infoPromise)
      .then((infos) => infos.map((info) => info.data));
  }

  setCards() {
    const cardInfo = this.state.relatedProductInformation.map((product, idx) => {
      const newProduct = JSON.parse(JSON.stringify(product));
      newProduct.styles = this.state.productStyles[idx];
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

  updateYourOutfitSet(removeIDFromOutfit) {
    // this.state.outfitID.has(this.props.selectedProduct.id)
    if (removeIDFromOutfit) {
      this.setState(prevState => {
        const oldOutfitIDArray = [...prevState.outfitID];
        const oldOutfitIDSet = new Set(oldOutfitIDArray);
        oldOutfitIDSet.delete(removeIDFromOutfit);
        return {
          outfitID: oldOutfitIDSet
        }
      });
    } else if (!this.state.outfitID.has(this.props.selectedProduct.id)) {
      const outfitIDList = [...this.state.outfitID];
      outfitIDList.push(this.props.selectedProduct.id)
      this.setState({ outfitID: new Set(outfitIDList) })
    }
  }



  render() {
    if (this.state.loading) {
      return <div>Loading...</div>
    }
    return (
      <div className="rpo-main-container">
        <AddOutfitCard addCurrentProductToOutfit={this.updateYourOutfitSet} />
        <RelatedProducts cards={this.state.relatedProductCards} />
        <YourOutfit
          cards={this.state.yourOutfitCards}
        />
      </div>
    );
  }
}

export default RelatedItemsAndComparison;
