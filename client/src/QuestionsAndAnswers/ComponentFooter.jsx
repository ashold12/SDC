import React from 'react';

const ComponentFooter = function ({ questions, incrementQuestions, numberOfQuestionsToRender }) {
  const numberOfQuestions = questions.results.length;

  if (numberOfQuestions < numberOfQuestionsToRender || numberOfQuestions <= 4) {
    return (
      <div>
        <div>
          <button>ADD A QUESTION +</button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div>
        <button onClick={incrementQuestions}>MORE ANSWERED QUESTIONS</button>
        <button>ADD A QUESTION +</button>
      </div>
    </div>
  );
};

export default ComponentFooter;
