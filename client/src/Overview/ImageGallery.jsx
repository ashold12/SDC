import React from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

import { MdExpandMore, MdExpandLess, MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { IoMdExpand } from 'react-icons/io';
import Zoom from './Zoom.jsx';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startingPoint: null,
      selectedThumbnail: null,
      selectedThumbnailUrl: null,
      onLastPhoto: false,
      onFirstPhoto: true,
      expandedGallery: false,
      selectedStylePhotoIndex: 0,
      showRightArrow: true,
      showLeftArrow: false,
    };

    this.handleDownArrowClick = this.handleDownArrowClick.bind(this);
    this.checkLastPhoto = this.checkLastPhoto.bind(this);
    this.handleThumbnailClick = this.handleThumbnailClick.bind(this);
    this.checkFirstPhoto = this.checkFirstPhoto.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.handleUpArrowClick = this.handleUpArrowClick.bind(this);
    this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
    this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
  }

  componentDidUpdate(prevsProp) {
    const { selectedStyle } = this.props;

    if (selectedStyle !== prevsProp.selectedStyle) {
      this.setState(
        {
          selectedThumbnail: selectedStyle.photos[0].url,
          startingPoint: 0,
          selectedStylePhotoIndex: 0,
        },
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
    const lastPhoto = this.props.selectedStyle.photos.length;
    if (this.state.selectedStylePhotoIndex === lastPhoto - 2) {
      this.setState({ showRightArrow: false });
    }
    this.setState({
      selectedStylePhotoIndex: this.state.selectedStylePhotoIndex + 1,
    });
  }

  handleLeftArrowClick() {
    // if (this.state.selectedStylePhotoIndex !== 0) {
    //   this.setState({showLeftArrow: true})
    // }
    if (this.state.selectedStylePhotoIndex === 1) {
      this.setState({ onFirstPhoto: true });
    }
    this.setState({
      selectedStylePhotoIndex: this.state.selectedStylePhotoIndex - 1,
    });
  }

  handleThumbnailClick(thumbnailUrl, photo) {

    const { selectedStyle } = this.props;
    // get the thumbnail index
    // reset the selectedStylePhotoIdnex to that index
    // just need edge case if you click on the last photo
    let index;

    for (let i = 0; i < selectedStyle.photos.length; i++) {
      const currentPhoto = selectedStyle.photos[i];
      if (JSON.stringify(currentPhoto) === JSON.stringify(photo)) {
        index = i;
      }
    }

    this.setState({ selectedThumbnail: thumbnailUrl, selectedStylePhotoIndex: index }, () => {
      this.checkLastPhoto();
      this.checkFirstPhoto();
    });

    const lastPhoto = selectedStyle.photos.length;
    if (this.state.selectedStylePhotoIndex !== lastPhoto - 2) {
      this.setState({ showRightArrow: true });
    }
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
    this.setState({ expandedGallery: !this.state.expandedGallery });
    this.props.checkExpandedGallery();
  }

  render() {
    const { selectedProductStyles, selectedStyle } = this.props;
    const {
      startingPoint,
      onLastPhoto,
      onFirstPhoto,
      expandedGallery,
      selectedStylePhotoIndex,
      selectedThumbnail,
      showRightArrow,
    } = this.state;

    let increment = 3;
    let first7Images = [];
    let showDownArrow = true;
    // let startingIndex = this.state.selectedStylePhotoIndex

    if (selectedStyle) {
      first7Images = selectedStyle.photos.filter(
        (photo, index) => index >= startingPoint && index <= startingPoint + 6
      );
      if (selectedStyle.photos.length - startingPoint <= 7) {
        showDownArrow = false;
      }
      // start the selected thumbnail as the first photo
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
      left: '67em',
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
      width: '70em',
    };

    const leftArrowExpandedStyle = {
      display: 'grid',
      gridRowStart: 1,
      gridRowEnd: 6,
      top: '22em',
      right: '62em',
      position: 'relative',
      zIndex: 20,
    };

    if (selectedStyle) {
      return (
        <div className="o-imageGallery-container">
          {startingPoint === 0 ? null : (
            <MdExpandLess className="o-up-arrow" onClick={this.handleUpArrowClick} />
          )}
          {expandedGallery ? (
            <IoMdExpand style={expandedStyle} onClick={this.handleExpandClick} />
          ) : (
            <IoMdExpand className="o-imageGallery-expand" onClick={this.handleExpandClick} />
          )}

          {expandedGallery ? (
            // <Zoom
            //   img={selectedStyle.photos[selectedStylePhotoIndex].url}
            //   zoomScale={3}
            //   width={1600}
            //   height={600}
            //   style={{willChange: "transform"}}
            //   className="o-imageGalery"
            // />
            <img
              style={expandedImageStyle}
              src={`${selectedStyle.photos[selectedStylePhotoIndex].url}`}
            />
          ) : (
            <img
              className="o-imageGallery"
              src={`${selectedStyle.photos[selectedStylePhotoIndex].url}`}
            />
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
              borderBottom: '3.5px solid greenYellow',
            };

            const otherCss = {
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
              // borderBottom: "3px solid black",
            };

            increment += 5.5;
            // debugger
            if (selectedThumbnail === photo.url) {
              return (
                <img
                  style={styleCss}
                  src={photo.url}
                  onClick={() => {
                    this.handleThumbnailClick(photo.url, photo);
                  }}
                />
              );
            }
            return (
              <img
                style={otherCss}
                src={photo.url}
                onClick={() => {
                  this.handleThumbnailClick(photo.url, photo);
                }}
              />
            );
          })}

          {!onFirstPhoto && !expandedGallery && (
            <MdKeyboardArrowLeft className="o-left-arrow" onClick={this.handleLeftArrowClick} />
          )}
          {!onFirstPhoto && expandedGallery && (
            <MdKeyboardArrowLeft style={leftArrowExpandedStyle} onClick={this.handleLeftArrowClick} />
          )}
          {!onLastPhoto && showRightArrow && (
            <MdKeyboardArrowRight className="o-right-arrow" onClick={this.handleRightArrowClick} />
          )}
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
