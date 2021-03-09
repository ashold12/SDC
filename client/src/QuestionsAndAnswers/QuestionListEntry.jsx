import React from 'react';
import AnswerList from './AnswerList.jsx';
import HelpfulQuestion from './HelpfulQuestion.jsx'

const QuestionListEntry = function ({
  question,
  collapseAnswers,
  moreAnswersClicked,
  userWantsMoreAnswers,
  date,
  onClick,
  setQuestionBody,
  reportAnswer,
  state,
  updateQuestionHelpfulness,
  updateAnswerHelpfulness
}) {

  return (
    <div id="questionListEntry">
      <div>
        <h4 className="qa-question-links">
          Q:
          <span className="qa-question-text-only">{' ' + question.question_body}</span>
          <span className="qa-question-side-links">
            <HelpfulQuestion question={question} updateQuestionHelpfulness={updateQuestionHelpfulness} state={state}/>
{'   |   '}
            <a
              href="#"
              onClick={(e) => {
                onClick(e); setQuestionBody(question.question_id, question.question_body);
              }}
            >
              {' '}
              Add Answer
            </a>
          </span>
        </h4>
      </div>
      <div>
        <AnswerList
          date={date}
          answers={question.answers}
          questionId={question.question_id}
          collapseAnswers={collapseAnswers}
          moreAnswersClicked={moreAnswersClicked}
          userWantsMoreAnswers={userWantsMoreAnswers}
          reportAnswer={reportAnswer}
          state={state}
          updateAnswerHelpfulness={updateAnswerHelpfulness}
        />
      </div>
    </div>
  );
};

export default QuestionListEntry;
