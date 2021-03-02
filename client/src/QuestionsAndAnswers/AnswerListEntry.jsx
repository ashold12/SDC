import React from 'react';

const AnswerListEntry = function ({ answer }) {
  return (
    <h4>
      A:
      <span className="qa-answer-body"> {answer.body}</span>
    </h4>
  );
};

export default AnswerListEntry;
