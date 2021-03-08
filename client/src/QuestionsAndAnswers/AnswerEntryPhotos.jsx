import React from 'react';
let i = 0;

const AnswerEntryPhotos = function( {photos}) {
  i++;
  return (
    <div className="qa-answers-entry-photo-container">
    {photos.map((photo) => (
      <div className={`qa-answer-entry-photo${i}`} key={photos.indexOf(photo)}>
        <img className="qa-answer-thumbnails" src={photo} alt="Not sure what this is an image of" />
      </div>
    ))}
  </div>
  )
};

export default AnswerEntryPhotos