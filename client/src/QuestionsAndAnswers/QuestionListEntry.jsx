import React from 'react';
import AnswerList from './AnswerList.jsx';

const QuestionListEntry = function ({ question, collapseAnswers, moreAnswersClicked, userWantsMoreAnswers }) {
  return (
    <div>
      <div>
      <h4 className="qa-question-links">Q: {question.question_body} <span> Helpful? <a href="#" onClick={(e)=> {e.preventDefault()}}>Yes?</a>(#here){' | '}<a href="#" onClick={(e)=> {e.preventDefault()}}> Add Answer</a> {'      '}</span></h4>
      </div>
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
