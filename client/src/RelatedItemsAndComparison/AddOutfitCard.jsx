import React from 'react';

function AddOutfitCard({ addCurrentProductToOutfit }) {
  const handleClick = () => {
    addCurrentProductToOutfit();
  };

  return (
    <div
      className="rpo-addOutfit-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={addCurrentProductToOutfit}
    >
      Add Outfit
    </div>
  );
}

export default AddOutfitCard;
