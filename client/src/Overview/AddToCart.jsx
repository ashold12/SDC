import React from 'react';
import { AiOutlinePlus } from 'react-icons';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSize: null,
      selectedSizeItem: null, // object containing quanitity and size
      selectedQuantity: null,
      allQuantities: [],
      allSizes: [],
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
                selectedQuantity: 1,
              },
              function () {
                this.checkQuantity();
              },
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

  // on submit is handled on the form itself, not the button so you can access the other values
  handleAddToCart(event) {
    event.preventDefault();

    if (this.state.selectedSize === null || this.state.selectedSize === 'select size') {
      // it should open the select size dropdown and display "please select size above all the sizes"
      // this.openDropdown()
    } else if (
      (this.state.selectedSize !== null || this.state.selectedSize !== 'select size')
      && this.state.selectedQuantity !== null
    ) {
      alert(
        `You added ${this.state.selectedQuantity} ${this.props.selectedStyle.name} ${this.props.selectedProduct.name} to your cart`,
      );
    }
  }

  // check what quantities to render for (< 15 condition)
  checkQuantity() {
    const { selectedStyle } = this.props;

    let allSizes = [];
    let maxQuantity = 1;

    const allQuantities = [];

    if (selectedStyle) {
      allSizes = Object.values(selectedStyle.skus);
      this.setState({ allSizes });
    }

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
    const { selectedStyle, outOfStock } = this.props;
    const { allQuantities } = this.state;

    // checkout quanity
    let allSizes = [];
    // let maxQuantity = 1;

    // const allQuantities = [];

    if (selectedStyle) {
      allSizes = Object.values(selectedStyle.skus);
    }
    // if (this.state.selectedSizeItem) {
    //   maxQuantity = this.state.selectedSizeItem.quantity;
    //   if (maxQuantity > 15) {
    //     maxQuantity = 15;
    //   } else {
    //     maxQuantity = this.state.selectedSizeItem.quantity;
    //   }
    //   for (let i = 1; i <= maxQuantity; i++) {
    //     allQuantities.push(i);
    //   }
    // }

    // checkout out of stock
    // const inventory = [];
    // let outOfStock = false;

    // allSizes.forEach((item) => {
    //   if (item.quantity === 0) {
    //     inventory.push(item);
    //   }
    // });

    // if (inventory.length === allSizes.length) {
    //   // this.changeOutOfStock();
    //   outOfStock = true;
    // } else {
    //   outOfStock = false;
    // }

    // case when state is loaded - break up into component
    if (allSizes.length !== 0) {
      return (
        <form className="o-addToCart" onSubmit={this.handleAddToCart}>
          <select onChange={this.handleSelectedSize}>
            {!outOfStock && <option>select size</option>}
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
            {console.log(outOfStock)}
          </select>
          <select onChange={this.handleSelectedQuantity}>
            {!this.state.selectedSize && <option>-</option>}
            {allQuantities.map((quantity) => (
              <option name="quantity">{quantity}</option>
            ))}
          </select>
          {outOfStock && (
            <button id="o-hide" type="submit">
              ADD TO BAG
              <span>
                {/* <AiOutlinePlus /> */}
              </span>
            </button>
          )}
          {!outOfStock && (
            <button type="submit">
              ADD TO BAG
              <span>
                {/* <AiOutlinePlus /> */}
              </span>
            </button>
          )}
        </form>
      );
    } // case when state is still loading up - break up into component
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
          {/* <span> <AiOutlinePlus /> </span> */}
        </button>
      </div>
    );
  }
}

export default AddToCart;
