import React from 'react';

const AnswerListEntry = function ({ answer, date }) {
  return (
    <div>
      <span className="qa-answer-body"> {answer.body}</span>
      <div className="qa-answer-footer">
            by
            {` ${  answer.answerer_name}`}
,{` ${date(answer.date)} | `}
            <span>
              {' '}
              Helpful?
              {' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Yes?
              </a>
              {' '}
              ({answer.helpfulness ? answer.helpfulness : 0})
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
};

export default AnswerListEntry;
