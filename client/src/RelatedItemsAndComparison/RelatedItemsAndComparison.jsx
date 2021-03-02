import React, { Component } from 'react';
import axios from 'axios';

import ItemCard from './ItemCard.jsx';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';

class RelatedItemsAndComparison extends Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedProducts: [],
      currentProductTemp: 17219,
    };
  }

  componentDidMount() {
    axios
      .get(`/api/products/${this.state.currentProductTemp}/related`)
      .then((related) => this.setState({ relatedProducts: related.data }))
      .then(() => console.log(this.state.relatedProducts))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="rpo-main-container">
        <RelatedProducts />
        <YourOutfit />
        <ItemCard />
      </div>
    );
  }
}

export default RelatedItemsAndComparison;
