import React from 'react';

const ComponentFooter = function ({incrementQuestions}) {
  return (
    <div>
      <div>
        <button onClick={incrementQuestions}>More Answered Questions</button>
        <button>Add A Question</button>
      </div>
    </div>
  );
};

export default ComponentFooter;
