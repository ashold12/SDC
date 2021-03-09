import React from 'react';

const HelpfulAnswer = function ({answer, state, updateAnswerHelpfulness}) {

  if (state[`answer${answer.id}Helpful`]) {
    return (
      <React.Fragment>
      {' '}
      Helpful?{' '}
        Yes!
      {' '}
      ({answer.helpfulness ? answer.helpfulness : 0})
      {' | '}
      </React.Fragment>
    )
  } else {
    return (
     <React.Fragment>
      {' '}
      Helpful?{' '}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
        updateAnswerHelpfulness(answer.id)}}
      >
        Yes?
      </a>{' '}
      ({answer.helpfulness ? answer.helpfulness : 0})
      {' | '}
      </React.Fragment>
    )



  }
}

export default HelpfulAnswer;