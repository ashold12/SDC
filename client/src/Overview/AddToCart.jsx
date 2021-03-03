import React from 'react';
import { AiOutlinePlus } from 'react-icons/Ai';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { selectedProductStyles, selectedStyle, selectedProduct } = this.props
    let allSizes = []
    let maxQuantity = 15
    if (selectedStyle) {
      allSizes = Object.values(selectedStyle.skus)
    }
    if (allSizes.length !== 0) {
      return (
        <div className="o-addToCart">
        <select>
          <option>select size</option>
          {allSizes.map((size) => {
            if (size.quantity === 0) {
              return <option>OUT OF STOCK</option>
            } else {
              return <option >{size.size}</option>
            }
          })}
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
      )
    } else {
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
      )
    }
  }
}

export default AddToCart;
