import React from 'react';
import AnswerListEntry from './AnswerListEntry.jsx';

const AnswerList = function ({ answers }) {

  //create an array that is dynamic to pass below to be mapped over
  //it will need state from whether or not the botton is clickable
  //create state base on id of answer.id for the button
  //
  let i = Object.values(answers).length;

  return (
    <div>
      {Object.values(answers).map((answer) => {
        i = i - 3;
        if (0 <= i) {
          return <AnswerListEntry answer={answer} key={answer.id} />
        }
      })}
      <button>Load More Answers</button>
    </div>
  );
};

export default AnswerList;
