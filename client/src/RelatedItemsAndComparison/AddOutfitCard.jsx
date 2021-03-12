import React from 'react';
import { SiPluscodes, TiPlusOutline, BiAddToQueue, TiPlus } from 'react-icons/ti';

function AddOutfitCard({ addCurrentProductToOutfit }) {
  const handleClick = () => {
    addCurrentProductToOutfit();
  };

  return (
    <div
      className="rpo-add-card-function"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={addCurrentProductToOutfit}
    >
      <TiPlus className="rpo-plus" size={175} color="#A9A9A9" />
      <div className="add-outfit-card-text">Add Outfit</div>
    </div>
  );
}

export default AddOutfitCard;
