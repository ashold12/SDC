import React from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/Fa';

import { MdExpandMore } from 'react-icons/Md';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startingPoint: null,
      selectedThumbnail: null,
      onLastPhoto: false,
      onFirstPhoto: true
    };

    this.handleDownArrowClick = this.handleDownArrowClick.bind(this);
    this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
    this.handleThumbnailClick = this.handleThumbnailClick.bind(this);
    this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
  }

  componentDidUpdate(prevsProp) {
    const { selectedStyle } = this.props;

    if (selectedStyle !== prevsProp.selectedStyle) {
      this.setState({ selectedThumbnail: selectedStyle.photos[0].thumbnail_url, startingPoint: 0 }, () => {
        this.handleRightArrowClick();
        this.handleLeftArrowClick();

      });

    }
  }

  handleDownArrowClick() {
    this.setState({
      startingPoint: this.state.startingPoint + 1,
    });
  }

  handleThumbnailClick(thumbnailUrl) {
    this.setState({ selectedThumbnail: thumbnailUrl }, () => {
      this.handleRightArrowClick();
      this.handleLeftArrowClick();
    });
  }

  handleRightArrowClick() {
    const { selectedStyle } = this.props
    const selectedStylePhotos = selectedStyle.photos
    const selectedStyleLength = selectedStylePhotos.length;
    const lastThumbnailUrl = selectedStylePhotos[selectedStyleLength - 1].thumbnail_url;

    if (lastThumbnailUrl === this.state.selectedThumbnail) {
      this.setState({onLastPhoto: true})
    } else {
      this.setState({onLastPhoto: false})
    }
  }

  handleLeftArrowClick() {
    const { selectedStyle } = this.props
    const selectedStylePhotos = selectedStyle.photos
    const firstThumbnailUrl = selectedStylePhotos[0].thumbnail_url;

    if (firstThumbnailUrl === this.state.selectedThumbnail) {
      this.setState({onFirstPhoto: true})
    } else {
      this.setState({onFirstPhoto: false})
    }

  }

  render() {
    const { selectedProductStyles, selectedStyle } = this.props;
    const { startingPoint, selectedThumbnail, onLastPhoto, onFirstPhoto } = this.state;

    // if (this.oldSelectedStyle !== selectedStyle) {
    //   // ok to set state in here bc the conidtion will stop
    //   this.setState({ startingPoint: 0 });
    // }

    // this.oldSelectedStyle = selectedStyle; // this will save it on the component itself
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
      if (!this.state.selectedThumbnail) {
        this.state.selectedThumbnail = selectedStyle.photos[0].thumbnail_url;
      }

      // console.log(first7Images);
    }

    if (selectedStyle) {
      return (
        <div className="o-imageGallery-container">
          <img className="o-imageGallery" src={`${selectedThumbnail}`} />
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
            return (
              <img
                style={styleCss}
                src={photo.thumbnail_url}
                onClick={() => {
                  this.handleThumbnailClick(photo.thumbnail_url);
                }}
              />
            );
          })}

          {!onFirstPhoto && <FaArrowCircleLeft className="o-left-arrow" />}
          {!onLastPhoto && <FaArrowCircleRight className="o-right-arrow" />}
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
