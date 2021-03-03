import React from 'react';
import AnswerListEntry from './AnswerListEntry.jsx';
import MostHelpfulAnswer from './MostHelpfulAnswer.jsx';

function AnswerList({
  answers,
  questionId,
  collapseAnswers,
  moreAnswersClicked,
  userWantsMoreAnswers,
}) {
  let i = 1;

  let orderedAnswers = Object.values(answers).sort((a, b) => {
    if (b.helpfulness < a.helpfulness) {
      return -1;
    } else if (a.helpfulness < b.helpfulness){
      return 1;
    } else {
      return 0;
    }
  });

  let mostHelpful = orderedAnswers[0];
  orderedAnswers.shift();

  const renderHelper = orderedAnswers.map((answer) => {
    if (i > 0) {
      i--;
      return (
        <div className="qa-answer-entry">
          <AnswerListEntry answer={answer} key={answer.id} />
        </div>
      );
    }
  });

  if (Object.values(answers).length === 1 || Object.values(answers).length === 0) {
    return (
    <div>
      <MostHelpfulAnswer answer={mostHelpful} key={mostHelpful.id} />
    <div className="qa-answer-entry">{renderHelper}</div>
    </div>
    )
  }

  if (
    userWantsMoreAnswers(questionId) === false
    || userWantsMoreAnswers(questionId) === undefined
  ) {
    return (
      <div className="qa-answer-entry">
        <MostHelpfulAnswer answer={mostHelpful} key={mostHelpful.id} />
        {renderHelper}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            moreAnswersClicked(questionId);
          }}
        >
          See More Answers
        </a>
      </div>
    );
  }

  return (
    <div>
      <MostHelpfulAnswer answer={mostHelpful} key={mostHelpful.id} />
      {orderedAnswers.map((answer) => (
        <div className="qa-answer-entry">

          <AnswerListEntry answer={answer} key={answer.id} />
        </div>
      ))}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          collapseAnswers(questionId);
        }}
      >
        Collapse Answers
      </a>
    </div>
  );
}

export default AnswerList;
