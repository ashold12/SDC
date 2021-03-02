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
      numberOfQuestionsToRender: 4
    };

    // BINDINGS

    this.tracksNumberOfLoadMoreAnswersButtonClicks = this.tracksNumberOfLoadMoreAnswersButtonClicks.bind(
      this);
    this.returnNumberOfLoadMoreAnswerButtonClicks = this.returnNumberOfLoadMoreAnswerButtonClicks.bind(
      this);
    this.collapseAnswers = this.collapseAnswers.bind(this);
    this.increaseNumberOfQuestionsToRender = this.increaseNumberOfQuestionsToRender.bind(this);
  }

  // HANDLERS

  tracksNumberOfLoadMoreAnswersButtonClicks(id) {
    if (this.state[id] === undefined) {
      this.setState({
        [id]: 1,
      });
    } else {
      this.setState({
        [id]: this.state[id] + 1,
      });
    }
  }

  returnNumberOfLoadMoreAnswerButtonClicks(id) {
    return this.state[id] ? this.state[id] : undefined;
  }

  collapseAnswers (id) {
    this.setState({
      [id]: undefined
    })
  }

  //QUESTIONLIST HANDLERS

  increaseNumberOfQuestionsToRender() {
    this.setState({
      numberOfQuestionsToRender: this.state.numberOfQuestionsToRender + 2,
    });
  }

  render() {
    return (
      <div>
        <SearchQuestions questions={this.state.questions} />
        <QuestionList
          questions={this.state.questions}
          trackClicks={this.tracksNumberOfLoadMoreAnswersButtonClicks}
          getClickCount={this.returnNumberOfLoadMoreAnswerButtonClicks}
          collapseAnswers={this.collapseAnswers}
          numberOfQuestionsToRender ={this.state.numberOfQuestionsToRender}
        />
        <ComponentFooter questions={this.state.questions} incrementQuestions={this.increaseNumberOfQuestionsToRender}/>
      </div>
    );
  }
}

export default QuestionsAndAnswers;
