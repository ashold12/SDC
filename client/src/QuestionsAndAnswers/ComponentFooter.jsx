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
          <button className="qa-componentFooter-button2" onClick={onClick}><span>ADD A QUESTION </span></button>
        </div>
      </div>
    );
  }
  return (

      <div className="qa-componentFooter-buttons-container">
        <button className="qa-componentFooter-button1" onClick={incrementQuestions}><span>MORE ANSWERED QUESTIONS</span></button>
        <button className="qa-componentFooter-button2" onClick={onClick}><span>ADD A QUESTION</span></button>
      </div>

  );
};

export default ComponentFooter;
