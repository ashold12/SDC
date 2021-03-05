import React from 'react';

const QuestionModal = function ({ show, onClick }) {
  if (!show) {
    return null;
  }
  return (
    <div className={show ? "qa-question-modal-show" : "qa-question-modal-hide"}>
      This is here but not showing?
      <form>
        <input type="textBox" />
        <div>
          <input type="text" />
          <input type="text" />
          <input type="submit" />
        </div>
        <input type="submit" name="closeQuestionModal" onClick={onClick}/>
      </form>
    </div>
  );
};

export default QuestionModal;
