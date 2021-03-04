import React from 'react';
import {BiCheckCircle} from 'react-icons/bi'

const StyleSelector = ({selectedStyle, selectedProductStyles, selectStyleThumbnail}) => {
  // need to use an onclick handler
    // should this.setState({selectedStyle: eventTarget}) when clicked
  let name = "loading";
  if (selectedStyle) {
    name = selectedStyle.name
  }

  return (
    <div className='o-styleSelector'>
      Style > {name}
      <div className="o-selectStyleThumbnail">
        {selectedProductStyles.map((style) => {
          if (selectedStyle.style_id === style.style_id) {
            return (<div key={style.style_id}>
              <BiCheckCircle/>
              <img key={style.style_id} className="o-items" src={style.photos[0].thumbnail_url} onClick={()=>{selectStyleThumbnail(style)}}></img>
            </div>)
          } else {
            return <img key={style.style_id} className="o-items" src={style.photos[0].thumbnail_url} onClick={()=>{selectStyleThumbnail(style)}}></img>
          }
      })}
      </div>
    </div>
  );
};

export default StyleSelector;
