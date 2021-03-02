import React from 'react';
import QuestionListEntry from './QuestionListEntry.jsx';

const QuestionList = function ({ questions, onClick, getClickCount }) {
  return (
    <div>
      {questions.results.map((question) => (
        <QuestionListEntry
          question={question}
          key={question.question_id}
          onClick={onClick}
          getClickCount={getClickCount}
        />
      ))}
    </div>
  );
};

export default QuestionList;
