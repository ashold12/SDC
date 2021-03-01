import React from 'react';
import style from './style.scss';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        react is up and running
        {/*need to pass in what item we're on here*/}
        <RatingsReviews />
      </div>
    );
  }
}

export default App;
