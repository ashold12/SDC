import React from 'react';
import AnswerListEntry from './AnswerListEntry.jsx';

const AnswerList = function ({ answers, onClick, questionId, getClickCount }) {
  const clickCount = getClickCount(questionId);

  const getNumberOfAnswersToRenderHelper = (count) => {
    if (count === undefined) {
      return 2;
    }
    if (count === 1) {
      return 4;
    }
    return getNumberOfAnswersToRenderHelper(count - 1) + 2;
  };

  const getNumberOfAnswersToRender = () => {
    const numberOfAnswers = Object.values(answers).length;
    const answersToRender = getNumberOfAnswersToRenderHelper(clickCount);
    if (numberOfAnswers - answersToRender < 0) {
      return numberOfAnswers;
    }
    return answersToRender;
  };

  let numberOfAnswersToRender = getNumberOfAnswersToRender();
  return (
    <div>
      {Object.values(answers).map((answer) => {
        if (numberOfAnswersToRender >= 0) {
          numberOfAnswersToRender--;
          return <AnswerListEntry answer={answer} key={answer.id} />;
        }
      })}
      <button onClick={() => onClick(questionId)}>Load More Answers</button>
    </div>
  );
};

export default AnswerList;
