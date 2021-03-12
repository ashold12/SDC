import React from 'react';
import { TiPlus } from 'react-icons/ti';

function AddOutfitCard({ addCurrentProductToOutfit, darkMode }) {
  const handleClick = () => {
    addCurrentProductToOutfit();
  };
  const setLightMode = {
    backgroundColor: '#eeeeee',
  };

  const setDarkMode = {
    backgroundColor: '#2e3033',
  };

  return (
    <div
      className="rpo-add-card-function"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={addCurrentProductToOutfit}
      style={darkMode ? setDarkMode : setLightMode}
    >
      <TiPlus className="rpo-plus" size={175} color="#A9A9A9" />
      <div className="add-outfit-card-text">Add Outfit</div>
    </div>
  );
}
/*
style={{
  backgroundColor: 'blue',
  width: '100px',
  height: '100px'
}}
*/
export default AddOutfitCard;
