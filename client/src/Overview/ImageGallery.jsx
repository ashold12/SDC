import React from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/Fa';

import { MdExpandMore } from 'react-icons/Md';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startingPoint: null,
    };

    this.handleDownArrowClick = this.handleDownArrowClick.bind(this);
  }

  handleDownArrowClick(key) {
    this.setState({
      startingPoint: this.state.startingPoint + 1,
    });
  }

  render() {
    const { selectedProductStyles, selectedStyle } = this.props;
    const { startingPoint } = this.state;

    if (this.oldSelectedStyle !== selectedStyle) {
      // ok to set state in here bc the conidtion will stop
      this.setState({ startingPoint: 0 });
    }
    this.oldSelectedStyle = selectedStyle; // this will save it on the component itself
    let increment = 3;
    let first7Images = [];
    let showDownArrow = true;

    if (selectedStyle) {
      first7Images = selectedStyle.photos.filter(
        (photo, index) => index >= startingPoint && index <= startingPoint + 6
      );
      if (selectedStyle.photos.length - startingPoint <= 7) {
        showDownArrow = false;
      }
      // console.log(first7Images);
    }

    if (selectedStyle) {
      return (
        <div className="o-imageGallery-container">
          <img className="o-imageGallery" src={`${selectedStyle.photos[0].thumbnail_url}`} />
          {first7Images.map((photo) => {
            const styleCss = {
              position: 'relative',
              gridColumnStart: 1,
              gridColumnEnd: 2,
              gridRowStart: 1,
              gridRowEnd: 6,
              top: `${increment}em`,
              left: '1em',
              height: '5em',
              width: '5em',
              zIndex: 2,
            };
            increment += 5.5;
            // debugger
            return <img style={styleCss} src={photo.thumbnail_url} />;
          })}
          <FaArrowCircleLeft className="o-left-arrow" />
          <FaArrowCircleRight className="o-right-arrow" />
          {showDownArrow ? (
            <MdExpandMore className="o-down-arrow" onClick={this.handleDownArrowClick} />
          ) : null}
        </div>
      );
    }
    return <div>loading</div>;
  }
}

export default ImageGallery;
