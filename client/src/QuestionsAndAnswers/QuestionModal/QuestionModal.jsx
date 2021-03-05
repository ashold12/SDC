import React from 'react';

const QuestionModal = function ({ show, onClick, productName }) {
  if (!show) {
    return null;
  }
  return (
    <div className={show ? "qa-question-modal-show" : "qa-question-modal-hide"}>
      <h3>Ask Your Question</h3>
      <h4>About {productName}</h4>
      <form onSubmit={(e) => {e.preventDefault()}}>
        <div><label for="QuestionModalTextArea">Your Question*</label></div>
        <textarea name="QuestionModalTextArea" maxlength="1000" id="qa-question-modal-textarea" rows="10" cols="50" />
        <div>
        <div>
          <label for="QuestionModalNameInput">Your Nickname*</label></div>
          <input name="QuestionModalNameInput" maxlength="60" placeholder="Example: jackson11!" type="text" />
          <div>For privacy reasons, do not use your full name or email address</div>
          <div>

          <label for="QuestionModalEmailInput">Your Email*</label></div>
          <input name="QuestionModalEmailInput" maxlength="60" type="text" />
          <div>For authentication reasons, you will not be emailed</div>
        </div>
        <input type="submit" name="closeQuestionModal" onClick={onClick}/>
      </form>
    </div>
  );
};

export default QuestionModal;
