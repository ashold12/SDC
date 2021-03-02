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
    };

    // BINDINGS

    this.tracksNumberOfLoadMoreAnswersButtonClicks = this.tracksNumberOfLoadMoreAnswersButtonClicks.bind(
      this);
    this.returnNumberOfLoadMoreAnswerButtonClicks = this.returnNumberOfLoadMoreAnswerButtonClicks.bind(
      this);
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

  render() {
    return (
      <div>
        <SearchQuestions questions={this.state.questions} />
        <QuestionList
          questions={this.state.questions}
          onClick={this.tracksNumberOfLoadMoreAnswersButtonClicks}
          getClickCount={this.returnNumberOfLoadMoreAnswerButtonClicks}
        />
        <ComponentFooter questions={this.state.questions} />
      </div>
    );
  }
}

export default QuestionsAndAnswers;
