import React from 'react';
import AnswerEntryPhotos from './AnswerEntryPhotos.jsx';
import ReportedAnswerButton from './ReportedAnswerButton.jsx';

const AnswerListEntry = function ({ answer, date, reportAnswer, state }) {
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
              <ReportedAnswerButton answer={answer} reportAnswer={reportAnswer} state={state}/>
            </span>
          </div>
          <AnswerEntryPhotos photos={answer.photos}/>
    </div>
  );
};

export default AnswerListEntry;
