import React from 'react';

const QuestionModal = function ({ show, onClick, productName, onChange, state, verifyForm, resetForm}) {
  if (!show) {
    return null;
  }
  return (
    <div className={show ? "qa-question-modal-show" : "qa-question-modal-hide"}>
      <form className="qa-question-modal-form" onSubmit={(e) => {e.preventDefault(), verifyForm()}}>
      <h3 className="qa-question-modal-griditem1">Ask Your Question</h3>
      <h4 className="qa-question-modal-griditem2">About {productName}</h4>

          <label htmlFor="QuestionModalTextArea" className="qa-question-modal-griditem3">{state.questionFormQuestionValidation === false ? <span className="qa-modal-alert-text">You must enter a Question! </span>:'Your Question*'}</label>
        <textarea
        name="QuestionModalTextArea"
        className="qa-question-modal-griditem4"
        value={state.QuestionModalTextArea || ''}
        onChange={onChange}
        maxLength="1000"
        id="qa-question-modal-textarea"
        rows="10"
        cols="50"
        />
          <label htmlFor="QuestionModalNameInput" className="qa-question-modal-griditem5">{state.questionFormNameValidation === false ? <span className="qa-modal-alert-text">You must enter a NickName! </span>:'Your Nickname*'}</label>

          <input name="QuestionModalNameInput" className="qa-question-modal-griditem6" value={state.QuestionModalNameInput || ''} onChange={onChange} maxLength="60" placeholder="Example: jackson11!" type="text" />
          <div className="qa-question-modal-griditem7">For privacy reasons, do not use your full name or email address
          </div>

          <label htmlFor="QuestionModalEmailInput" className="qa-question-modal-griditem8">{state.questionFormEmailValidation === false ? <span className="qa-modal-alert-text">The email address provided is not in correct email format</span>:'Your Email*'}</label>

          <input name="QuestionModalEmailInput" placeholder="Example: jackson@hotmail.com" className="qa-question-modal-griditem9" value={state.QuestionModalEmailInput || ''} onChange={onChange} maxLength="60" type="text" />
          <div className="qa-question-modal-griditem10">For authentication reasons, you will not be emailed
          </div>

        <input type="submit" className="qa-question-modal-griditem11" name="closeQuestionModal"/>
      <input type="click" name="closeQuestionModal" onClick={(e) => {onClick(e); resetForm()}} value="Close" className="qa-question-modal-griditem12"/>
      </form>
    </div>
  );
};

export default QuestionModal;
