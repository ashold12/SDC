import axios from 'axios';

module.exports.relatedItems = (productID) => {
  axios
    .get(`/api/products/${productID}/related`)
    .then((related) => console.log(related))
    .catch((err) => console.log(err));
};
