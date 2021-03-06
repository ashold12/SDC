import React from 'react';

const AnswerModal = function ({
  show,
  state,
  productName,
  getQuestionBeingAnswered,
}) {

  if (!show) {
    return null;
  }

  return (
    <div className={show ? 'qa-answer-modal-show' : 'qa-answer-modal-hide'}>
      <form
        className="qa-answer-modal-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h3 className="qa-answer-modal-griditem1">Submit you Answer</h3>
         <h4 className="qa-answer-modal-griditem2">
          About
          {productName}: {state.questionToBeAnswered}
        </h4>
{/*
        <label htmlFor="answerModalTextArea" className="qa-answer-modal-griditem3">
          {state.answerFormAnswerValidation === false ? (
            <span className="qa-modal-alert-text">You must enter a Answer! </span>
          ) : (
            'Your Answer*'
          )}
        </label>
        <textarea
          name="AnswerModalTextArea"
          className="qa-answer-modal-griditem4"
          value={state.AnswerModalTextArea || ''}
          onChange={onChange}
          maxLength="1000"
          id="qa-answer-modal-textarea"
          rows="10"
          cols="50"
        />
        <label htmlFor="AnswerModalNameInput" className="qa-answer-modal-griditem5">
          {state.answerFormNameValidation === false ? (
            <span className="qa-modal-alert-text">You must enter a NickName! </span>
          ) : (
            'Your Nickname*'
          )}
        </label>

        <input
          name="AnswerModalNameInput"
          className="qa-answer-modal-griditem6"
          value={state.AnswerModalNameInput || ''}
          onChange={onChange}
          maxLength="60"
          placeholder="Example: jackson11!"
          type="text"
        />
        <div className="qa-answer-modal-griditem7">
          For privacy reasons, do not use your full name or email address
        </div>

        <label htmlFor="AnswerModalEmailInput" className="qa-answer-modal-griditem8">
          {state.answerFormEmailValidation === false ? (
            <span className="qa-modal-alert-text">
              The email address provided is not in correct email format
            </span>
          ) : (
            'Your Email*'
          )}
        </label>

        <input
          name="AnswerModalEmailInput"
          placeholder="Example: jackson@hotmail.com"
          className="qa-answer-modal-griditem9"
          value={state.AnswerModalEmailInput || ''}
          onChange={onChange}
          maxLength="60"
          type="text"
        />
        <div className="qa-answer-modal-griditem10">
          For authentication reasons, you will not be emailed
        </div>

        <input type="submit" className="qa-answer-modal-griditem11" name="closeAnswerModal" />
        <input
          type="click"
          name="closeAnswerModal"
          onClick={(e) => {
            onClick(e);
            resetForm();
          }}
          placeHolder="Close"
          className="qa-answer-modal-griditem12"
        /> */}
      </form>
    </div>
  )
}

export default AnswerModal;