import React from 'react';
import QuestionList from './QuestionList.jsx';
import SearchQuestions from './SearchQuestions.jsx';
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
        <SearchQuestions questions={this.state.questions}/>
        <QuestionList questions={this.state.questions} />
      </div>
    );
  }
}

export default QuestionsAndAnswers;
