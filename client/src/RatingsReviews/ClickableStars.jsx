import React from 'react';

const ClickableStars = function (props) {
  const onChange = props.onChange;
  return (
    <form>
      <fieldset>
        <span className="rr-star-modal-group">
          <input onChange={onChange} type="radio" id="rating-5" name="rating" value="5" />
          <label onChange={onChange} for="rating-5">
            5
          </label>
          <input onChange={onChange} type="radio" id="rating-4" name="rating" value="4" />
          <label onChange={onChange} for="rating-4">
            4
          </label>
          <input onChange={onChange} type="radio" id="rating-3" name="rating" value="3" />
          <label onChange={onChange} for="rating-3">
            3
          </label>
          <input onChange={onChange} type="radio" id="rating-2" name="rating" value="2" />
          <label onChange={onChange} for="rating-2">
            2
          </label>
          <input onChange={onChange} type="radio" id="rating-1" name="rating" value="1" />
          <label for="rating-1">1</label>
          <input
            type="radio"
            id="rating-0"
            name="rating"
            value="0"
            className="rr-star-modal-clear"
          />
          <label for="rating-0">0</label>
        </span>
        {props.ratingString}
      </fieldset>
    </form>
  );
};

export default ClickableStars;
