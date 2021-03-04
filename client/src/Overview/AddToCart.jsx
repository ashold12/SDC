import React from 'react';
import { AiOutlinePlus } from 'react-icons/Ai';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSize: null,
      selectedSizeItem: null, // object on quanitity and size
      selectedSku: null, // set this to the individual sku object
      selectedQuantity: null,
    };

    this.handleSelectedSize = this.handleSelectedSize.bind(this);
    this.handleSelectedQuantity = this.handleSelectedQuantity.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleSelectedSize(event) {
    const selectedSize = event.target.value;
    this.setState(
      {
        selectedSize,
      },
      function () {
        for (const key in this.props.selectedStyle.skus) {
          if (this.props.selectedStyle.skus[key].size === this.state.selectedSize) {
            this.setState({
              selectedSku: key,
              selectedSizeItem: this.props.selectedStyle.skus[key],
              selectedQuantity: 1
            });
          }
        }
      },
    );
  }

  handleSelectedQuantity(event) {
    const selectedQuantity = event.target.value;
    this.setState({
      selectedQuantity,
    });
  }

  handleAddToCart(event) {
    // on submit is handled on the form itself, not the button so you can access the other values
    event.preventDefault();
    console.log("hi")
    debugger;

    if (this.state.selectedSize === null || this.state.selectedSize === "select size") {
      // open the select size dropdown and display "please select size"
    } else if ((this.state.selectedSize !== null || this.state.selectedSize !== "select size") && this.state.selectedQuantity !== null) {
      alert(`You added ${this.state.selectedQuantity} ${this.props.selectedStyle.name} ${this.props.selectedProduct.name} to your cart`)
    }
  }

  render() {
    const { selectedProductStyles, selectedStyle, selectedProduct } = this.props;
    let allSizes = [];
    let maxQuantity = 1;

    const allQuantities = [];

    if (selectedStyle) {
      allSizes = Object.values(selectedStyle.skus);
    }
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
    }

    const inventory = [];
    let outOfStock = false;

    allSizes.forEach((item) => {
      if (item.quantity === 0) {
        inventory.push(item);
      }
    });

    if (inventory.length === allSizes.length) {
      outOfStock = true;
    } else {
      outOfStock = false;
    }

    // case when state is loaded
    if (allSizes.length !== 0) {
      return (
        <form className="o-addToCart" onSubmit={this.handleAddToCart}>
          <select onChange={this.handleSelectedSize}>
            {!outOfStock && <option>select size</option>}
            {allSizes.map((size) => {
              if (size.quantity === 0) {
                inventory.push(size);
                return <option id="o-hide">OUT OF STOCK</option>;
              }
              return <option name={size.size} key={size.size}>{size.size}</option>;
            })}
            {outOfStock && <option>OUT OF STOCK</option>}
          </select>
          <select onChange={this.handleSelectedQuantity}>
            {!this.state.selectedSize && <option>-</option>}
            {allQuantities.map((quantity) => (
              <option name="quantity">{quantity}</option>
            ))}
          </select>
          {outOfStock && <button id="o-hide" type="submit">
            ADD TO BAG
            <span>
              <AiOutlinePlus />
            </span>
          </button>}
          {!outOfStock && <button type="submit">
            ADD TO BAG
            <span>
              <AiOutlinePlus />
            </span>
          </button>}
        </form>
      );
    } // case when state is still loading up
    return (
      <div className="o-addToCart">
        <select>
          <option>select size</option>
        </select>
        <select>
          <option>1</option>
        </select>
        <button type="submit">
          ADD TO BAG
          <span>
            <AiOutlinePlus />
          </span>
        </button>
      </div>
    );
  }
}

export default AddToCart;
