import React from 'react';
import QuestionListEntry from './QuestionListEntry.jsx';

const QuestionList = function ({ questions, trackClicks, getClickCount, collapseAnswers }) {
  return (
    <div>
      {questions.results.map((question) => (
        <QuestionListEntry
          question={question}
          key={question.question_id}
          trackClicks={trackClicks}
          getClickCount={getClickCount}
          collapseAnswers={collapseAnswers}
        />
      ))}
    </div>
  );
};

export default QuestionList;
