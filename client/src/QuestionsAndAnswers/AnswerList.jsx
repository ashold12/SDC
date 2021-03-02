import React from 'react';
import AnswerListEntry from './AnswerListEntry.jsx';

const AnswerList = function ({
 answers, trackClicks, questionId, getClickCount, collapseAnswers
}) {
  const clickCount = getClickCount(questionId);
  const numberOfAnswers = Object.values(answers).length;

  const getNumberOfAnswersToRenderHelper = (count) => {
    if (count === undefined) {
      return 2;
    }
    if (count === 1) {
      return 4;
    }
    return getNumberOfAnswersToRenderHelper(count - 1) + 2;
  };
  const answersToRender = getNumberOfAnswersToRenderHelper(clickCount);

  const getNumberOfAnswersToRender = () => {
    if (numberOfAnswers - answersToRender < 0) {
      return numberOfAnswers;
    }
    return answersToRender;
  };

  let numberOfAnswersToRender = getNumberOfAnswersToRender();
  const renderHelper = Object.values(answers).map((answer) => {
    if (numberOfAnswersToRender > 0) {
      numberOfAnswersToRender--;
      return <AnswerListEntry answer={answer} key={answer.id} />;
    }
  });

  if (numberOfAnswers === 0 || numberOfAnswers === 1) {
    return <div>{renderHelper}</div>;
  }
  if (numberOfAnswers - answersToRender <= 0) {
    return (
      <div>
        {renderHelper}
        <button onClick={() => collapseAnswers(questionId)}>Collapse Answers</button>
      </div>
    );
  }
  return (
    <div>
      {renderHelper}
      <button onClick={() => trackClicks(questionId)}>Load More Answers</button>
    </div>
  );
};

export default AnswerList;
