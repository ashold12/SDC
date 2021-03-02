import React from 'react';
import AnswerList from './AnswerList.jsx';

const QuestionListEntry = function ({ question, onClick, getClickCount }) {
  return (
    <div>
      <div>{question.question_body}</div>
      <div>
        <AnswerList
          answers={question.answers}
          onClick={onClick}
          questionId={question.question_id}
          getClickCount={getClickCount}
        />
      </div>
    </div>
  );
};

export default QuestionListEntry;
