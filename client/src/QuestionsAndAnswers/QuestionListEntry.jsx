import React from 'react';
import AnswerList from './AnswerList.jsx';

const QuestionListEntry = function ({ question, trackClicks, getClickCount, collapseAnswers }) {
  return (
    <div>
      <div>{question.question_body}</div>
      <div>
        <AnswerList
          answers={question.answers}
          trackClicks={trackClicks}
          questionId={question.question_id}
          getClickCount={getClickCount}
          collapseAnswers={collapseAnswers}
        />
      </div>
    </div>
  );
};

export default QuestionListEntry;
