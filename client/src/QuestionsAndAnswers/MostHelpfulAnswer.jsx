import React from 'react';

const MostHelpfulAnswer = function ({ answer }) {
  return (
    <div>
      <span  className="qa-helpful-body"> <span id="qa-answerlist-title">A:</span> {answer.body}</span>
      <div className="qa-mosthelpful-footer">
            by
            {` ${  answer.answerer_name}`}
,{` ${answer.date.slice(0, 10)} | `}
            <span>
              {' '}
              Helpful?{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Yes?
              </a>{' '}
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

export default MostHelpfulAnswer;