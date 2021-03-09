import React from 'react';

const HelpfulQuestion = function({question, updateQuestionHelpfulness, state}) {

  if (state[`answer${question.question_id}Helpful`] === undefined) {
    return (
      <React.Fragment>
        {' '}
              Helpful?{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault(); updateQuestionHelpfulness(question.question_id)
                }}
              >
                Yes?
              </a>{' '}
              (
  {question.question_helpfulness ? question.question_helpfulness : 0})
  </React.Fragment>
    );
  } else {
    return (
       <span>  {' '}
             Helpful?{' '}

                Yes!{' '}
              (
  {question.question_helpfulness ? question.question_helpfulness : 0})</span>

    )

  }

}


export default HelpfulQuestion