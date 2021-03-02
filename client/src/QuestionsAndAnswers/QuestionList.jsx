import React from 'react';
import QuestionListEntry from './QuestionListEntry.jsx';

const QuestionList = function ({ questions, trackClicks, getClickCount, collapseAnswers, numberOfQuestionsToRender }) {
  return (
    <div>
      {questions.results.map((question) => {
        numberOfQuestionsToRender--;
        if (0 <= numberOfQuestionsToRender) {
          return <QuestionListEntry
            question={question}
            key={question.question_id}
            trackClicks={trackClicks}
            getClickCount={getClickCount}
            collapseAnswers={collapseAnswers}
          />

        }
      })}
    </div>
  );
};

export default QuestionList;
