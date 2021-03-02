import React from 'react';
import style from './style.scss';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import Overview from './Overview/Overview.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        react is up and running
        {/*need to pass in what item we're on here*/}
        <Overview />
        <QuestionsAndAnswers />
        <RatingsReviews />
      </div>
    );
  }
}

export default App;
