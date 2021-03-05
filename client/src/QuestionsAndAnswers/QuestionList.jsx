import React from 'react';
import QuestionListEntry from './QuestionListEntry.jsx';
import QuestionModal from './QuestionModal/QuestionModal.jsx'

const QuestionList = function ({
 questions, collapseAnswers, numberOfQuestionsToRender, moreAnswersClicked, userWantsMoreAnswers, date, productName, onClick
}) {

  if (numberOfQuestionsToRender === 0) {
   return( <div className="qa-questionList-container">
     <h3 className="qa-no-results">NO QUESTIONS HAVE BEEN ASKED</h3>
    </div>)
  }
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
              onClick={onClick}
            />
          );
        }
      })}
    </div>
  );
};

export default QuestionList;
