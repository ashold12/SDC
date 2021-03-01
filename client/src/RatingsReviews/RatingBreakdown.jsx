import React from 'react';
import axios from 'axios';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    const { productId } = this.props;
    axios
      .get(`/api/reviews/meta?product_id=${productId}`)
      .then((data) => {
        this.updateData(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateData(data) {
    this.setState({ ...data });
    console.log(this.state);
  }

  fetchData() {
    const { productId } = this.props;
    axios
      .get(`/api/reviews/meta?product_id=${productId}`)
      .then((data) => {
        this.setState({ ...data.data });
        debugger;
      })
      .bind(this)
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return <div>Working.</div>;
  }
}

export default RatingBreakdown;
