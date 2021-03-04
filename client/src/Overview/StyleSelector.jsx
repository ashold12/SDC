import React from 'react';
import { BiCheckCircle } from 'react-icons/bi';

const StyleSelector = ({selectedStyle, selectedProductStyles, selectStyleThumbnail}) => {

  // name is dynamic based on how long it takes state to be set
  let name = "loading";

  if (selectedStyle) {
    name = selectedStyle.name;
  }

  return (
    <div className="o-styleSelector">
      Style > {name}
      <div className="o-selectStyleThumbnail">
        {selectedProductStyles.map((style) => {
          // put checkmark on the thumbnail if clicked
          if (selectedStyle.style_id === style.style_id) {
            return (<div key={style.style_id}>
              <BiCheckCircle/>
              <img key={style.style_id} className="o-items" src={style.photos[0].thumbnail_url} onClick={()=>{selectStyleThumbnail(style)}}></img>
            </div>)
          }
          // if the thumbnail is not selected, don't include the checkmark
          else {
            return <img key={style.style_id} className="o-items" src={style.photos[0].thumbnail_url} onClick={()=>{selectStyleThumbnail(style)}}></img>
          }
        })}
      </div>
    </div>
  );
};

export default StyleSelector;
