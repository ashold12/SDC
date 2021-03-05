import React from 'react';
import { AiOutlinePlus } from 'react-icons';
import axios from 'axios';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSize: null,
      selectedSizeItem: null, // object containing quanitity and size
      selectedQuantity: null,
      allQuantities: [],
      selectedItemSku: null,
      // allSizes: [],
    };

    this.handleSelectedSize = this.handleSelectedSize.bind(this);
    this.handleSelectedQuantity = this.handleSelectedQuantity.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.checkQuantity = this.checkQuantity.bind(this);
  }

  // once size is selected
  // set selectedSize in state
  // make default quantity 1
  // check quanityt for < 15 condition
  handleSelectedSize(event) {
    const selectedSize = event.target.value;

    this.setState(
      {
        selectedSize,
      },
      function () {
        for (const key in this.props.selectedStyle.skus) {
          if (this.props.selectedStyle.skus[key].size === this.state.selectedSize) {
            this.setState(
              {
                selectedSizeItem: this.props.selectedStyle.skus[key],
                selectedItemSku: key,
                selectedQuantity: 1,
              },() => {this.checkQuantity()}
            );
          }
        }
      }
    );
  }

  // once a quantity is selcted => set the state of selectedQuantity
  handleSelectedQuantity(event) {
    const selectedQuantity = event.target.value;
    this.setState({
      selectedQuantity,
    });
  }

  // take out event prevent default if you want it to reset everytime
  handleAddToCart(sku) {
    // debugger;
    const { selectedQuantity } = this.state;
    const skuInt = Number(sku);
    const selectedQuantityInt = Number(selectedQuantity)
    event.preventDefault();

    if (this.state.selectedSize === null || this.state.selectedSize === 'SELECT SIZE') {
      // it should open the select size dropdown and display "please select size above all the sizes"
      // this.openDropdown()
    } else if (
      (this.state.selectedSize !== null || this.state.selectedSize !== 'SELECT SIZE')
      && this.state.selectedQuantity !== null
    ) {
      // send post request of id to the item added to cart
      // no count parameter for api?
      for (var i=0; i<selectedQuantityInt; i++) {
        axios
        .post('/api/cart', { sku_id: skuInt })
        .then((response) => {
          console.log(response);
        })
      }

      // alert(
      //   `You added ${this.state.selectedQuantity} ${this.props.selectedStyle.name} ${this.props.selectedProduct.name} to your cart`,
      // );
    }
  }

  // check what quantities to render for (< 15 condition)
  checkQuantity() {
    const { selectedStyle } = this.props;

    let maxQuantity = 1;

    const allQuantities = [];

    // max quantity is either 15 or the quantity of the item
    if (this.state.selectedSizeItem) {
      maxQuantity = this.state.selectedSizeItem.quantity;
      if (maxQuantity > 15) {
        maxQuantity = 15;
      } else {
        maxQuantity = this.state.selectedSizeItem.quantity;
      }
      for (let i = 1; i <= maxQuantity; i++) {
        allQuantities.push(i);
      }
      this.setState({ allQuantities });
    }
  }

  render() {
    const { outOfStock, allSizes } = this.props;
    const { allQuantities, selectedItemSku } = this.state;

    // case when state is loaded - break up into component
    // break this up into components on next refactor
    if (allSizes.length !== 0) {
      return (
        <form className="o-addToCart">
          <select id="o-size-selector" onChange={this.handleSelectedSize}>
            {!outOfStock && <option>SELECT SIZE</option>}
            {allSizes.map((size) => {
              if (size.quantity === 0) {
                return <option id="o-hide">OUT OF STOCK</option>;
              }
              return (
                <option name={size.size} key={size.size}>
                  {size.size}
                </option>
              );
            })}
            {outOfStock && <option>OUT OF STOCK</option>}
          </select>
          <select id="o-quantity-selector" onChange={this.handleSelectedQuantity}>
            {!this.state.selectedSize && <option>-</option>}
            {allQuantities.map((quantity) => (
              <option name="quantity">{quantity}</option>
            ))}
          </select>
          {outOfStock && (
            <button id="o-hide" type="submit">
              ADD TO BAG
              <span>{/* <AiOutlinePlus /> */}</span>
            </button>
          )}
          {!outOfStock && (
            <button
              id="o-add-to-bag-button"
              type="submit"
              onClick={() => {
                this.handleAddToCart(selectedItemSku);
              }}
            >
              ADD TO BAG
              <span>{/* <AiOutlinePlus /> */}</span>
            </button>
          )}
        </form>
      );
    } // case when state is still loading up - break up into component
    return (
      <div className="o-addToCart">
        <select>
          <option>SELECT SIZE</option>
        </select>
        <select>
          <option>1</option>
        </select>
        <button type="submit">
          ADD TO BAG
          {/* <span> <AiOutlinePlus /> </span> */}
        </button>
      </div>
    );
  }
}

export default AddToCart;
