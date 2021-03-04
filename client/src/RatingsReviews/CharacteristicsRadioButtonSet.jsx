import React from 'react';

// We take in a characteristic, then we create radio button elements for 1 - 5,
// We'll set the name to characteristics-{charname}
// When it gets clicked we'll pass the name and the value into our
// onclick handler.

const CharacteristicsRadioButtonSet = (props) => {
  if (!props) {
    return <div />;
  }
  const { characteristic, changeHandler } = props;
  const translationObject = {
    Size: (
      <div className="rr-chara-words">
        <div className="rr-chara-1">A size too small</div>
        <div className="rr-chara-1">1/2 a size too small</div>
        <div className="rr-chara-1">Perfect</div>
        <div className="rr-chara-1">1/2 a size too big</div>
        <div className="rr-chara-1">A size too wide</div>
      </div>
    ),
    Width: (
      <div className="rr-chara-words">
        <div className="rr-chara-1">Too narrow</div>
        <div className="rr-chara-1">Slightly narrow</div>
        <div className="rr-chara-1">Perfect </div>
        <div className="rr-chara-1">Slightly wide</div>
        <div className="rr-chara-1">Too wide</div>
      </div>
    ),
    Comfort: (
      <div className="rr-chara-words">
        <div className="rr-chara-1">Uncomfortable</div>
        <div className="rr-chara-1">Slightly Comfortable</div>
        <div className="rr-chara-1">Ok</div>
        <div className="rr-chara-1">Comfortable</div>
        <div className="rr-chara-1">Perfect</div>
      </div>
    ),
    Quality: (
      <div className="rr-chara-words">
        <div className="rr-chara-1">Poor</div>
        <div className="rr-chara-1">Below average</div>
        <div className="rr-chara-1">What I expected</div>
        <div className="rr-chara-1">Pretty great</div>
        <div className="rr-chara-1">Perfect</div>
      </div>
    ),

    Length: (
      <div className="rr-chara-words">
        <div className="rr-chara-1">Runs short</div>
        <div className="rr-chara-1">Runs slightly short</div>
        <div className="rr-chara-1">Perfect</div>
        <div className="rr-chara-1">Runs slightly long</div>
        <div className="rr-chara-1">Runs long</div>
      </div>
    ),
    Fit: (
      <div className="rr-chara-words">
        <div className="rr-chara-1">Runs tight</div>
        <div className="rr-chara-1">Runs slightly tight</div>
        <div className="rr-chara-1">Perfect</div>
        <div className="rr-chara-1">Runs slightly long</div>
        <div className="rr-chara-1">Runs long</div>
      </div>
    ),
  };

  return (
    <div className="rr-chara-radio-container">
      <h2>{characteristic}</h2>
      {translationObject[characteristic]}
      <div className="rr-chara-radio-button">
        <input
          type="radio"
          className="rr-chara-rad-butt"
          name={`characteristic-${characteristic}`}
          value="1"
          onChange={changeHandler}
        />
        <input
          className="rr-chara-rad-butt"
          type="radio"
          name={`characteristic-${characteristic}`}
          value="2"
          onChange={changeHandler}
        />
        <input
          className="rr-chara-rad-butt"
          type="radio"
          name={`characteristic-${characteristic}`}
          value="3"
          onChange={changeHandler}
        />
        <input
          className="rr-chara-rad-butt"
          type="radio"
          name={`characteristic-${characteristic}`}
          value="4"
          onChange={changeHandler}
        />
        <input
          className="rr-chara-rad-butt"
          type="radio"
          name={`characteristic-${characteristic}`}
          value="5"
          onChange={changeHandler}
        />
      </div>
    </div>
  );
};
export default CharacteristicsRadioButtonSet;
