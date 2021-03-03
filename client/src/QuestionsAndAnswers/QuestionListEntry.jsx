import React from 'react';
import AnswerList from './AnswerList.jsx';

const QuestionListEntry = function ({ question, collapseAnswers, moreAnswersClicked, userWantsMoreAnswers }) {
  return (
    <div>
      <h4>Q: {question.question_body}</h4>
      <div>
        <AnswerList
          answers={question.answers}
          questionId={question.question_id}
          collapseAnswers={collapseAnswers}
          moreAnswersClicked={moreAnswersClicked}
          userWantsMoreAnswers={userWantsMoreAnswers}
        />
      </div>
    </div>
  );
};

export default QuestionListEntry;
