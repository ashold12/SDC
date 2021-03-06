import React from 'react';

const AnswerModalImages = function ({ photos, onChange }) {

  if (5 <= photos.length) {
    return (
      <div className="qa-answer-modal-griditem13">
        <div>This still works</div>
      </div>
    );
  } else {
    return (
      <div className="qa-answer-modal-griditem13">
        {
          photos.map(photo => {
            return (
            <div className="qa-answer-thumbnails">
              <div>Close button soon</div>
              <img className="qa-answer-thumbnails" src={photo} alt="Image you just uploaded"/>
            </div>
            )
          })
        }
        <input type="file" accept="image/*" placeholder="Add Image" onChange={onChange}></input>
      </div>
    )}
};

export default AnswerModalImages;
