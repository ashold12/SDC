import React from 'react';
import QuestionListEntry from './QuestionListEntry.jsx';

const QuestionList = function ({
 questions, collapseAnswers, numberOfQuestionsToRender, moreAnswersClicked, userWantsMoreAnswers
}) {

  let orderedQuestions = questions.results.sort((a, b) => {
    if (b.question_helpfulness < a.question_helpfulness) {
      return -1;
    } else if (a.question_helpfulness < b.question_helpfulness){
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div className="qa-questionList-container">
      {orderedQuestions.map((question) => {
        numberOfQuestionsToRender--;
        if (numberOfQuestionsToRender >= 0) {
          return (
            <QuestionListEntry
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
