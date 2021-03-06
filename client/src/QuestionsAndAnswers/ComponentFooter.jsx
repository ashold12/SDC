import React from 'react';

const ComponentFooter = function ({ questions, incrementQuestions, numberOfQuestionsToRender, onClick }) {

  if (questions === undefined || questions.results === undefined) {
    return <div />
  }

  const numberOfQuestions = questions.results.length;

  if (numberOfQuestions < numberOfQuestionsToRender || numberOfQuestions <= 4) {
    return (
      <div>
        <div>
          <button className="qa-componentFooter-buttons qa-componentFooter-buttons-effect" onClick={onClick}><span className="qa-componentFooter-button-spans">ADD A QUESTION +</span></button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="qa-componentFooter-buttons-container">
        <button className="qa-componentFooter-buttons qa-componentFooter-buttons-effect" onClick={incrementQuestions}><span className="qa-componentFooter-button-spans">MORE ANSWERED QUESTIONS</span></button>
        <button className="qa-componentFooter-buttons qa-componentFooter-buttons-effect" onClick={onClick}><span className="qa-componentFooter-button-spans">ADD A QUESTION +</span></button>
      </div>
    </div>
  );
};

export default ComponentFooter;
