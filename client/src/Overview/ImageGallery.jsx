import React from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/Fa';

import { MdExpandMore, MdExpandLess } from 'react-icons/Md';
import { IoMdExpand } from 'react-icons/Io';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startingPoint: null,
      selectedThumbnail: null,
      onLastPhoto: false,
      onFirstPhoto: true,
      expandedGallery: false,
      selectedStylePhotoIndex: 0
    };

    this.handleDownArrowClick = this.handleDownArrowClick.bind(this);
    this.checkLastPhoto = this.checkLastPhoto.bind(this);
    this.handleThumbnailClick = this.handleThumbnailClick.bind(this);
    this.checkFirstPhoto = this.checkFirstPhoto.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.handleUpArrowClick = this.handleUpArrowClick.bind(this);
    this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
  }

  componentDidUpdate(prevsProp) {
    const { selectedStyle } = this.props;

    if (selectedStyle !== prevsProp.selectedStyle) {
      this.setState(
        { selectedThumbnail: selectedStyle.photos[0].url, startingPoint: 0, selectedStylePhotoIndex: 0 },
        () => {
          this.checkLastPhoto();
          this.checkFirstPhoto();
        }
      );
    }
  }

  handleDownArrowClick() {
    this.setState({
      startingPoint: this.state.startingPoint + 1,
    });
  }

  handleUpArrowClick() {
    if (this.state.startingPoint !== 0) {
      this.setState({
        startingPoint: this.state.startingPoint - 1,
      });
    }
  }

  handleRightArrowClick() {
    this.setState({
      selectedStylePhotoIndex: this.state.selectedStylePhotoIndex + 1,
    });
  }

  handleThumbnailClick(thumbnailUrl) {
    this.setState({ selectedThumbnail: thumbnailUrl }, () => {
      this.checkLastPhoto();
      this.checkFirstPhoto();
    });
  }

  checkLastPhoto() {
    const { selectedStyle } = this.props;
    const selectedStylePhotos = selectedStyle.photos;
    const selectedStyleLength = selectedStylePhotos.length;
    const lastThumbnailUrl = selectedStylePhotos[selectedStyleLength - 1].url;

    if (lastThumbnailUrl === this.state.selectedThumbnail) {
      this.setState({ onLastPhoto: true });
    } else {
      this.setState({ onLastPhoto: false });
    }
  }

  checkFirstPhoto() {
    const { selectedStyle } = this.props;
    const selectedStylePhotos = selectedStyle.photos;
    const firstThumbnailUrl = selectedStylePhotos[0].url;

    if (firstThumbnailUrl === this.state.selectedThumbnail) {
      this.setState({ onFirstPhoto: true });
    } else {
      this.setState({ onFirstPhoto: false });
    }
  }

  handleExpandClick() {
    this.setState({expandedGallery: !this.state.expandedGallery})

  }

  render() {
    const { selectedProductStyles, selectedStyle } = this.props;
    const {
      startingPoint,
      selectedThumbnail,
      onLastPhoto,
      onFirstPhoto,
      expandedGallery,
      selectedStylePhotoIndex,
    } = this.state;

    let increment = 3;
    let first7Images = [];
    let showDownArrow = true;
    let startingIndex = this.state.selectedStylePhotoIndex

    if (selectedStyle) {
      first7Images = selectedStyle.photos.filter(
        (photo, index) => index >= startingPoint && index <= startingPoint + 6
      );
      if (selectedStyle.photos.length - startingPoint <= 7) {
        showDownArrow = false;
      }
      if (!this.state.selectedThumbnail) {
        this.state.selectedThumbnail = selectedStyle.photos[0].url;
      }
    }

    const expandedStyle = {
      position: 'relative',
      gridColumnStart: 1,
      gridColumnEnd: 2,
      gridRowStart: 1,
      gridRowEnd: 6,
      top: '1.5em',
      left: '80em',
      height: '1.5em',
      width: '1.5em',
      zIndex: 50,
    };

    const expandedImageStyle = {
      position: 'relative',
      zIndex: 1,
      display: 'grid',
      gridColumnStart: 1,
      gridColumnEnd: 4,
      gridRowStart: 1,
      gridRowEnd: 6,
      height: '44.5em',
      width: '83.5em',
    };

    if (selectedStyle) {
      return (
        <div className="o-imageGallery-container">
          {startingPoint === 0 ? null : <MdExpandLess className="o-up-arrow" onClick={this.handleUpArrowClick} />}
          {expandedGallery ? (
            <IoMdExpand style={expandedStyle} onClick={this.handleExpandClick} />
          ) : (
            <IoMdExpand className="o-imageGallery-expand" onClick={this.handleExpandClick} />
          )}

          {expandedGallery ? (
            <img style={expandedImageStyle} src={`${selectedThumbnail}`} />
          ) : (
            <img className="o-imageGallery" src={`${selectedStyle.photos[startingIndex].url}`} />
          )}

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
                src={photo.url}
                onClick={() => {
                  this.handleThumbnailClick(photo.url);
                }}
              />
            );
          })}

          {!onFirstPhoto && <FaArrowCircleLeft className="o-left-arrow" />}
          {!onLastPhoto && <FaArrowCircleRight className="o-right-arrow" onClick={this.handleRightArrowClick}/>}
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
