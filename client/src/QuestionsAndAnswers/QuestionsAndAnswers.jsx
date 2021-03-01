import React from 'react';
import QuestionList from './QuestionList.jsx';
import data from './dummyQuestions.js';

class QuestionsAndAnswers extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: data,
    };
  }

  render() {
    return (
      <div>
        <QuestionList questions={this.state.questions} />
      </div>
    );
  }
}

export default QuestionsAndAnswers;
