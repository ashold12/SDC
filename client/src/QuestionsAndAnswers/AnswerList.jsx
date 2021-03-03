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

  let orderedAnswers = Object.values(answers).sort((a, b) => {
    if (a.helpfulness < b.helpfulness) {
      return -1;
    } else if (b.helpfulness < a.helpfulness){
      return 1;
    } else {
      return 0;
    }
  });

  const renderHelper = orderedAnswers.map((answer) => {
    if (i > 0) {
      i--;
      return (
        <div className="qa-answer-entry">
          <AnswerListEntry answer={answer} key={answer.id} />
          <div>
            by
            {` ${  answer.answerer_name}`}
,{` ${answer.date.slice(0, 10)} | `}
            <span>
              {' '}
              Helpful?
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Yes?
              </a>
              (#here)
              {' | '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Report
              </a>
            </span>
          </div>
        </div>
      );
    }
  });

  if (Object.values(answers).length === 1 || Object.values(answers).length === 0) {
    return <div className="qa-answer-entry">{renderHelper}</div>;
  }

  if (
    userWantsMoreAnswers(questionId) === false
    || userWantsMoreAnswers(questionId) === undefined
  ) {
    return (
      <div className="qa-answer-entry">
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
      {orderedAnswers.map((answer) => (
        <div className="qa-answer-entry">
          <AnswerListEntry answer={answer} key={answer.id} />
          <div>
            by
            {` ${  answer.answerer_name  } `}
,{` ${answer.date.slice(0, 10)} | `}
            <span>
              {' '}
              Helpful?
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Yes?
              </a>
              (#here)
              {' | '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Report
              </a>
            </span>
          </div>
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
