import React from 'react';

const AnswerListEntry = function ({ answer }) {
  return (
    <div>
      <span className="qa-answer-body"> {answer.body}</span>
    </div>
  );
};

export default AnswerListEntry;
