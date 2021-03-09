import React from 'react';
import ReportedAnswerButton from './ReportedAnswerButton.jsx';

const MostHelpfulAnswer = function ({ answer, date, reportAnswer, state, updateAnswerHelpfulness={updateAnswerHelpfulness}}) {
  return (
    <div>
      <span  className="qa-helpful-body"> <span id="qa-answerlist-title">A:</span> {' ' + answer.body}</span>
      <div className="qa-mosthelpful-footer">
            by
            {` ${  answer.answerer_name}`}
,{` ${date(answer.date)} | `}
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
              <ReportedAnswerButton answer={answer} reportAnswer={reportAnswer} state={state}/>
            </span>
          </div>
      </div>

  );
};

export default MostHelpfulAnswer;