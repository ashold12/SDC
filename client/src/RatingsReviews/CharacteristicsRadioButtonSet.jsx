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
    size: [
      'A size too small',
      '1/2 a size too small',
      'Perfect',
      '1/2 a size too big',
      'A size too wide',
    ],
    width: ['Too narrow', 'Slightly narrow', 'Prefect', 'Slightly wide', 'Too wide'],
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
    comfort: ['Uncomfortable', 'Slightly Comfortable', 'Ok', 'Comfortable', 'Perfect'],
    quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    Quality: (
      <div className="rr-chara-words">
        <div className="rr-chara-1">Poor</div>
        <div className="rr-chara-1">Below average</div>
        <div className="rr-chara-1">What I expected</div>
        <div className="rr-chara-1">Pretty great</div>
        <div className="rr-chara-1">Perfect</div>
      </div>
    ),
    length: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
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

      <div className="rr-chara-radio-button">
        <label className="rr-rad-button-label" htmlFor={`characteristic-${characteristic}`}>
          {translationObject[characteristic.toLowerCase()][0]}
        </label>
        <input
          type="radio"
          className="rr-chara-rad-butt"
          name={`characteristic-${characteristic}`}
          value="1"
          onChange={changeHandler}
        />
        <label className="rr-rad-button-label" htmlFor={`characteristic-${characteristic}`}>
          {translationObject[characteristic.toLowerCase()][1]}
        </label>
        <input
          className="rr-chara-rad-butt"
          type="radio"
          name={`characteristic-${characteristic}`}
          value="2"
          onChange={changeHandler}
        />
        <label className="rr-rad-button-label" htmlFor={`characteristic-${characteristic}`}>
          {translationObject[characteristic.toLowerCase()][2]}
        </label>
        <input
          className="rr-chara-rad-butt"
          type="radio"
          name={`characteristic-${characteristic}`}
          value="3"
          onChange={changeHandler}
        />
        <label className="rr-rad-button-label" htmlFor={`characteristic-${characteristic}`}>
          {translationObject[characteristic.toLowerCase()][3]}
        </label>
        <input
          className="rr-chara-rad-butt"
          type="radio"
          name={`characteristic-${characteristic}`}
          value="4"
          onChange={changeHandler}
        />
        <label className="rr-rad-button-label" htmlFor={`characteristic-${characteristic}`}>
          {translationObject[characteristic.toLowerCase()][4]}
        </label>
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
