import React from 'react';
import style from './style.scss';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import Overview from './Overview/Overview.jsx';
import RelatedItemsAndComparison from './RelatedItemsAndComparison/RelatedItemsAndComparison.jsx';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allProducts: []
    };

    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    axios.get('api/products?count=*')
      .then((data) => { // data.data is an array of all products, where each product is an object
        this.setState({
          allProducts: data.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="main-app">
        {/* react is up and running */}
        {/*need to pass in what item we're on here*/}
        <Overview />
        <RelatedItemsAndComparison allProducts={this.state.allProducts} />
        <QuestionsAndAnswers />
        <RatingsReviews />
      </div>
    );
  }
}

export default App;
