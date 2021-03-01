import React from 'react';
import QuestionListEntry from './QuestionListEntry.jsx';

const QuestionList = function ({ questions }) {
  return (
    <div>
      {questions.results.map((question) => (
        <QuestionListEntry question={question} key={question.question_id}/>
      ))}
    </div>
  );
};

export default QuestionList;
