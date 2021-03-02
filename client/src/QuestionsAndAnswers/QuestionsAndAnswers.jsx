import React from 'react';
import QuestionList from './QuestionList.jsx';
import SearchQuestions from './SearchQuestions.jsx';
import ComponentFooter from './ComponentFooter.jsx';
import data from './dummyQuestions.js';

class QuestionsAndAnswers extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: data,
      numberOfQuestionsToRender: 4,
    };

    // BINDINGS

    this.moreAnswersClicked = this.moreAnswersClicked.bind(this);
    this.collapseAnswers = this.collapseAnswers.bind(this);
    this.increaseNumberOfQuestionsToRender = this.increaseNumberOfQuestionsToRender.bind(this);
    this.userWantsMoreAnswers = this.userWantsMoreAnswers.bind(this);
    this.findNumberOfQuestionsToRender = this.findNumberOfQuestionsToRender.bind(this);
  }

  // HANDLERS

  moreAnswersClicked(id) {
    this.setState({
      [id]: true,
    });
  }

  collapseAnswers(id) {
    this.setState({
      [id]: false,
    });
  }

  userWantsMoreAnswers(id) {
    return this.state[id];
  }

  //QUESTION LIST HANDLERS

  findNumberOfQuestionsToRender() {
    let numberOfQuestions = this.state.questions.results.length;

    if (numberOfQuestions < 4) {
      this.setState({
        numberOfQuestionsToRender: numberOfQuestions,
      })
    }
  }

  increaseNumberOfQuestionsToRender() {
    this.setState({
      numberOfQuestionsToRender: this.state.numberOfQuestionsToRender + 2,
    });
  }

  componentDidMount() {
    this.findNumberOfQuestionsToRender();
  }

  render() {
    return (
      <div>
        <SearchQuestions questions={this.state.questions} />
        <QuestionList
          questions={this.state.questions}
          moreAnswersClicked={this.moreAnswersClicked}
          collapseAnswers={this.collapseAnswers}
          numberOfQuestionsToRender={this.state.numberOfQuestionsToRender}
          userWantsMoreAnswers={this.userWantsMoreAnswers}
        />
        <ComponentFooter questions={this.state.questions} numberOfQuestionsToRender={this.state.numberOfQuestionsToRender} incrementQuestions={this.increaseNumberOfQuestionsToRender} />
      </div>
    );
  }
}

export default QuestionsAndAnswers;
