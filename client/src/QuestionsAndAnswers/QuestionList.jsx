import React from 'react';
import QuestionListEntry from './QuestionListEntry.jsx';

const QuestionList = function ({
 questions, collapseAnswers, numberOfQuestionsToRender, moreAnswersClicked, userWantsMoreAnswers, date
}) {
  return (
    <div className="qa-questionList-container">
      {questions.results.map((question) => {
        numberOfQuestionsToRender--;
        if (numberOfQuestionsToRender >= 0) {
          return (
            <QuestionListEntry
              date={date}
              question={question}
              key={question.question_id}
              moreAnswersClicked={moreAnswersClicked}
              collapseAnswers={collapseAnswers}
              userWantsMoreAnswers={userWantsMoreAnswers}
            />
          );
        }
      })}
    </div>
  );
};

export default QuestionList;
