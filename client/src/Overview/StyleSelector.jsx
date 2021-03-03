import React from 'react';

const StyleSelector = ({selectedProductStyles}) => {
  // need to use an onclick handler
    // should this.setState({selectedStyle: eventTarget}) when clicked
  return (
    <div className='o-styleSelector'>
      Style > selected style
      <div className="o-selectStyleThumbnail">
        {selectedProductStyles.map((style) => {
        return <img className="o-items" src={style.photos[0].thumbnail_url}></img>
      })}
      </div>
    </div>
  );
};

export default StyleSelector;
