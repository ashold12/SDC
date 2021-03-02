import React from 'react';
import AnswerListEntry from './AnswerListEntry.jsx';

function AnswerList({
  answers,
  questionId,
  collapseAnswers,
  moreAnswersClicked,
  userWantsMoreAnswers,
}) {
  let i = 2;

  const renderHelper = Object.values(answers).map((answer) => {
    if (i > 0) {
      i--;
      return (
        <div>
          <AnswerListEntry answer={answer} key={answer.id} />
        </div>
      );
    }
  });

  if (Object.values(answers).length === 1 || Object.values(answers).length === 0) {
    return <div>{renderHelper}</div>;
  }

  if (
    userWantsMoreAnswers(questionId) === false
    || userWantsMoreAnswers(questionId) === undefined
  ) {
    return (
      <div>
        {renderHelper}
        <button
          onClick={() => {
            moreAnswersClicked(questionId);
          }}
        >
          Load More Answers
        </button>
      </div>
    );
  }

  return (
    <div>
      {Object.values(answers).map((answer) => (
        <div>
          <AnswerListEntry answer={answer} key={answer.id} />
        </div>
      ))}
      <button
        onClick={() => {
          collapseAnswers(questionId);
        }}
      >
        Collapse Answers
      </button>
    </div>
  );
}

export default AnswerList;
