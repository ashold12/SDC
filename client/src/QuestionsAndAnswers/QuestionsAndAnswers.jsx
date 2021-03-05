import React from 'react';
import QuestionList from './QuestionList.jsx';
import SearchQuestions from './SearchQuestions.jsx';
import ComponentFooter from './ComponentFooter.jsx';
import AnswerModal from './AnswerModal/AnswerModal.jsx'
import QuestionModal from './QuestionModal/QuestionModal.jsx'
import data from './dummyQuestions.js';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfQuestionsToRender: 4,
      searchBarText: '',
      showQuestionModal: false,
      showAnswerModal: false,
    };

    // BINDINGS

    this.moreAnswersClicked = this.moreAnswersClicked.bind(this);
    this.collapseAnswers = this.collapseAnswers.bind(this);
    this.increaseNumberOfQuestionsToRender = this.increaseNumberOfQuestionsToRender.bind(this);
    this.userWantsMoreAnswers = this.userWantsMoreAnswers.bind(this);
    this.findNumberOfQuestionsToRender = this.findNumberOfQuestionsToRender.bind(this);
    this.onChange = this.onChange.bind(this);
    this.sortQuestions = this.sortQuestions.bind(this);
    this.searchQuestions = this.searchQuestions.bind(this);
    this.getFormattedDate = this.getFormattedDate.bind(this);
    this.answerModalClickHandler = this.answerModalClickHandler.bind(this);
    this.questionModalClickHandler = this.questionModalClickHandler.bind(this);
    this.showAnswerModal = this.showAnswerModal.bind(this);
    this.showQuestionModal = this.showQuestionModal.bind(this);
  }

  // REQUESTS


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
    let numberOfQuestions = this.props.selectedProductsQuestions.results
      ? this.props.selectedProductsQuestions.results.length
      : undefined;

    if (numberOfQuestions === undefined) {
      this.setState({
        noProduct: true,
      });
    }

    if (numberOfQuestions < 4) {
      this.setState({
        numberOfQuestionsToRender: numberOfQuestions,
        noProduct: false,
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
    }, () => {
      this.searchQuestions();
    });
  }

  // MODAL HANDLERS

  // Answers
  answerModalClickHandler(e) {
    e.preventDefault();
    this.showAnswerModalHandler();
  }

  showAnswerModalHandler(e) {
    e.preventDefault();
    this.setState({
      showAnswerModal: true
    })
  }

  // Questions

  questionModalClickHandler(e) {
    e.preventDefault();
    this.showQuestionModalHandler();
  }

  showQuestionModalHandler(e) {
    e.preventDefault();
    this.setState({
      showQuestionModal: true
    })
  }

  // FILTERS
  sortQuestions() {
    const questions = this.props.selectedProductsQuestions;
    if (questions.results === undefined) {
      return console.error('Nothing to Sort');
    }
    questions.results.sort((a, b) => {
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
    // Part 1: Search and Filter State
    const { searchBarText } = this.state;
    const questions = this.props.selectedProductsQuestions;

    if (questions.results === undefined) {
      return console.error('Nothing to Search');
    }

    const search = searchBarText;
    const foundQuestions = [];
    const copy = {};
    copy.product_id = questions.product_id;
    copy.results = foundQuestions;

    for (let i = 0; i < questions.results.length; i++) {
      const questionText = questions.results[i].question_body;

      if (questionText.includes(search)) {
        foundQuestions.push(questions.results[i]);
      } else {
        continue;
      }
    }
    this.setState({
      searchResults: copy,
    });

    // Part 2: Search and replace HTML

    const htmlQuestions = document.getElementsByClassName("qa-question-text-only");

    for (let element of htmlQuestions) {
      // Remove <mark> tags if they exist
      let removeMarks = '<mark className="qa-questions-searched">|</mark>';
      element.innerHTML = element.innerHTML.replace(new RegExp (removeMarks, 'gi'), () => {
        return ``
       });
      //Add <mark> tags
      element.innerHTML = element.innerHTML.replace(new RegExp (search, 'gi'), (same) => {
        return `<mark className="qa-questions-searched">${same}</mark>`;
        });
    }
  }

  // DATES

  getFormattedDate(unformatedDate) {
    const date = new Date(unformatedDate);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let day = date.getDate().toString();
    if (day.length < 2) {
      day = `0${day}`;
    }
    const formattedDate = `${months[date.getMonth()]} ${day}, ${date.getFullYear()}`;
    return formattedDate;
  }

  componentDidMount() {
    this.findNumberOfQuestionsToRender();
      this.sortQuestions();

  }

  render() {

    if (this.state.noProduct === true) {
      return (

        <div className="qa-main-container">
        <div className="qa-qna-title">QUESTIONS & ANSWERS</div>
        <SearchQuestions onChange={this.onChange}/>
          <div className="qa-questionList-container">
            <h3 className="qa-no-results">NO PRODUCT HAS BEEN SELECTED</h3>
          </div>
        <ComponentFooter questions={3 < this.state.searchBarText.length ? this.state.searchResults : this.props.selectedProductsQuestions} numberOfQuestionsToRender={this.state.numberOfQuestionsToRender} incrementQuestions={this.increaseNumberOfQuestionsToRender} />
      </div>

      )

    }
    else if (this.state.numberOfQuestionsToRender === 0) {
      return (

        <div className="qa-main-container">
        <div className="qa-qna-title">QUESTIONS & ANSWERS</div>
        <SearchQuestions onChange={this.onChange}/>
          <div className="qa-questionList-container">
            <h3 className="qa-no-results">NO QUESTIONS HAVE BEEN ASKED</h3>
          </div>
        <ComponentFooter questions={3 < this.state.searchBarText.length ? this.state.searchResults : this.props.selectedProductsQuestions} numberOfQuestionsToRender={this.state.numberOfQuestionsToRender} incrementQuestions={this.increaseNumberOfQuestionsToRender} />
      </div>

      )
    }
    return (
      <div className="qa-main-container">
        <div className="qa-qna-title">QUESTIONS & ANSWERS</div>
        <SearchQuestions onChange={this.onChange} />
        <QuestionList
          questions={3 < this.state.searchBarText.length ? this.state.searchResults : this.props.selectedProductsQuestions}
          moreAnswersClicked={this.moreAnswersClicked}
          collapseAnswers={this.collapseAnswers}
          numberOfQuestionsToRender={this.state.numberOfQuestionsToRender}
          userWantsMoreAnswers={this.userWantsMoreAnswers}
          date={this.getFormattedDate}
        />
        <ComponentFooter questions={3 < this.state.searchBarText.length ? this.state.searchResults : this.props.selectedProductsQuestions} numberOfQuestionsToRender={this.state.numberOfQuestionsToRender} incrementQuestions={this.increaseNumberOfQuestionsToRender} />
      </div>
    );
  }
}

export default QuestionsAndAnswers;
