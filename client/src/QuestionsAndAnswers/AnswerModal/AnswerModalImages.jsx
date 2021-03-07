import React from 'react';

const AnswerModalImages = function ({ photos, onChange }) {
  if (photos.length >= 5) {
    return (
      <div className="qa-answer-modal-griditem13">
      {photos.map((photo) => (
        <div className="qa-answer-modal-photos">
          <div>Close button soon</div>
          <img className="qa-answer-thumbnails" src={photo} alt="Image you just uploaded" />
        </div>
      ))}
    </div>
    );
  }
  return (
    <div className="qa-answer-modal-griditem13">
      {photos.map((photo) => (
        <div className="qa-answer-modal-photos">
          <div>Close button soon</div>
          <img className="qa-answer-thumbnails" src={photo} alt="Image you just uploaded" />
        </div>
      ))}
      <input type="file" accept="image/*" placeholder="Add Image" onChange={onChange} />
    </div>
  );
};

export default AnswerModalImages;
