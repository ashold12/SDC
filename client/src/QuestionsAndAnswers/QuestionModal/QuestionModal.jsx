import React from 'react';

const QuestionModal = function ({ show, onClick, productName, onChange, state, verifyForm}) {
  if (!show) {
    return null;
  }
  return (
    <div className={show ? "qa-question-modal-show" : "qa-question-modal-hide"}>
      <h3>Ask Your Question</h3>
      <h4>About {productName}</h4>
      <form onSubmit={(e) => {e.preventDefault(); console.log(`submitted`)}}>
        <div><label htmlFor="QuestionModalTextArea">Your Question*</label></div>
        <textarea name="QuestionModalTextArea" value={state.QuestionModalTextArea || ''} onChange={onChange} maxLength="1000" id="qa-question-modal-textarea" rows="10" cols="50" />
        <div>
        <div>
          <label htmlFor="QuestionModalNameInput">Your Nickname*</label></div>
          <input name="QuestionModalNameInput" value={state.QuestionModalNameInput || ''} onChange={onChange} maxLength="60" placeholder="Example: jackson11!" type="text" />
          <div>For privacy reasons, do not use your full name or email address</div>
          <div>

          <label htmlFor="QuestionModalEmailInput">Your Email*</label></div>
          <input name="QuestionModalEmailInput" placeholder="Example: jackson@hotmail.com" value={state.QuestionModalEmailInput || ''} onChange={onChange} maxLength="60" type="text" />
          <div>For authentication reasons, you will not be emailed</div>
        </div>
        <input type="submit" name="closeQuestionModal" onClick={verifyForm}/>
      </form>
      <input type="submit" name="closeQuestionModal" onClick={onClick}/>
    </div>
  );
};

export default QuestionModal;
