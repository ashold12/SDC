import React from 'react';

const AnswerListEntry = function ({ answer }) {
  return (
    <div>
      <span className="qa-answer-body"> {answer.body}</span>
      <div className="qa-answer-footer">
            by
            {` ${  answer.answerer_name}`}
,{` ${answer.date.slice(0, 10)} | `}
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
