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
      allProducts: [],
      selectedProduct: null,
      questions: {},
    };

    this.getAllProducts = this.getAllProducts.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    this.getAllProducts();
    this.getProduct();
  }

  getAllProducts() {
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

  getProduct() {
    axios.get('api/products/17762')
      .then((product) => {
        this.setState({
          selectedProduct: product.data
        }, () => {
          this.getQuestions();
        });

    axios.get('api/products/17762').then((product) => {
      this.setState({
        selectedProduct: product.data,

      });
  }

  getQuestions() {
    axios.get(`api/qa/questions/?product_id=${this.state.selectedProduct.id}`)
      .then((questions) => {
        this.setState({
          questions: questions.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { selectedProduct } = this.state;
    return (
      <div className="main-app">
        {/* react is up and running */}
        {/*need to pass in what item we're on here*/}
        <Overview selectedProduct={selectedProduct} />
        <RelatedItemsAndComparison allProducts={this.state.allProducts} />
        {this.state.questions.results && <QuestionsAndAnswers
          selectedProduct={this.state.selectedProduct}
          selectedProductsQuestions={this.state.questions}

        />}
        <RatingsReviews />

        <QuestionsAndAnswers />
        <RatingsReviews productData={selectedProduct} />
      </div>
    );
  }
}

export default App;
