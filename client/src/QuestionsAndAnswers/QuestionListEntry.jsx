import React from 'react';
import AnswerList from './AnswerList.jsx';

const QuestionListEntry = function ({ question }) {
  return (
    <div>
      <div>{question.question_body}</div>
      <div>
        <AnswerList answers={question.answers} />
      </div>
    </div>
  );
};

export default QuestionListEntry;
