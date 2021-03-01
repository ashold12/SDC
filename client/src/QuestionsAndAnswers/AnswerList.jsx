import React from 'react';
import AnswerListEntry from './AnswerListEntry.jsx';

const AnswerList = function ({ answers }) {
  return (
    <div>
      {Object.values(answers).map((answer) => (
        <AnswerListEntry answer={answer} key={answer.id} />
      ))}
    </div>
  );
};

export default AnswerList;
