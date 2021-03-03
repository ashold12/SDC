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
      sortedFilteredQuestions: data,
      numberOfQuestionsToRender: 4,
      searchBarText: '',
    };




    // BINDINGS

    this.moreAnswersClicked = this.moreAnswersClicked.bind(this);
    this.collapseAnswers = this.collapseAnswers.bind(this);
    this.increaseNumberOfQuestionsToRender = this.increaseNumberOfQuestionsToRender.bind(this);
    this.userWantsMoreAnswers = this.userWantsMoreAnswers.bind(this);
    this.findNumberOfQuestionsToRender = this.findNumberOfQuestionsToRender.bind(this);
    this.onChange = this.onChange.bind(this);
    this.sortFilteredQuestions = this.sortFilteredQuestions.bind(this);
    this.searchQuestions = this.searchQuestions.bind(this);
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

  // QUESTION LIST HANDLERS

  findNumberOfQuestionsToRender() {
    const numberOfQuestions = this.state.questions.results.length;

    if (numberOfQuestions < 4) {
      this.setState({
        numberOfQuestionsToRender: numberOfQuestions,
      });
    }
  }

  increaseNumberOfQuestionsToRender() {
    const { numberOfQuestionsToRender } = this.state;
    this.setState({
      numberOfQuestionsToRender: numberOfQuestionsToRender + 2,
    });
  }

  // SEARCH BAR HANDLERS

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  // FILTERS
  sortFilteredQuestions() {
    this.state.questions.results.sort((a, b) => {
      if (b.question_helpfulness < a.question_helpfulness) {
        return -1;
      }
      if (a.question_helpfulness < b.question_helpfulness) {
        return 1;
      }
      return 0;
    });
  }

  searchQuestions() {

  //need to loop over the questions and check to see if the word is included in them or if they match the regex above

  let { searchBarText } = this.state;
  let { sortedFilteredQuestions } = this.state;
  let copy = sortedFilteredQuestions;
  let foundQuestions = [];

  for (let i = 0; i < copy.results.length; i++) {
    let questionText = copy.results[i].question_body;
    let search = searchBarText;

    if (questionText.includes(search)) {
      foundQuestions.push(copy.results[i]);
    } else {
      continue;
    }
  }
  copy.results = foundQuestions;
  this.setState({
    searchResults: copy,
  })
}

  componentDidMount() {
    this.findNumberOfQuestionsToRender();
    this.sortFilteredQuestions();
  }

  render() {
    return (
      <div>
        <div className="qa-qna-title">QUESTIONS & ANSWERS</div>
        <SearchQuestions questions={this.state.sortedFilteredQuestions} onChange={this.onChange} />
        <QuestionList
          questions={this.state.sortedFilteredQuestions}
          moreAnswersClicked={this.moreAnswersClicked}
          collapseAnswers={this.collapseAnswers}
          numberOfQuestionsToRender={this.state.numberOfQuestionsToRender}
          userWantsMoreAnswers={this.userWantsMoreAnswers}
        />
        <ComponentFooter questions={this.state.sortedFilteredQuestions} numberOfQuestionsToRender={this.state.numberOfQuestionsToRender} incrementQuestions={this.increaseNumberOfQuestionsToRender} />
      </div>
    );
  }
}

export default QuestionsAndAnswers;
