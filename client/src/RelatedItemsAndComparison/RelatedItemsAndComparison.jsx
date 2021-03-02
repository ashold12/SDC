import React, { Component } from 'react' ;

class RelatedItemsAndComparison extends Component {
  constructor(props) {
    super(props)


  }


  render() {
    return (
      <div className="outfit-and-comparison-container">
        <div className='related-products-outfits-main-container' name="RelatedProductsContainer">
          <div>RELATED PRODUCTS</div>
          <div>PRODUCT IMAGE HERE</div>
        </div>
        <div className='related-products-outfits-main-container'
        name='YourOutfitContainer'>
          <div>YOUR OUTFIT</div>
          <div>PRODUCT IMAGE HERE</div>
        </div>
      </div>
    )
  }
}


export default RelatedItemsAndComparison;
