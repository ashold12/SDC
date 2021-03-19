const express = require('express');
const db = require('./db/index.js');

const app = express();
const port = 8080;
// const url = require('url');
// const querystring = require('querystring');

app.use(express.json());

app.get(`/qa/questions/`, (req, res) => {
  console.log(req.query);
  //console.log(req.params)
  // expect page count and product id
  if (!req.query.product_id || typeof +req.query.product_id !== 'number') {
    res.status(401).send('invalid');
  }
  const productId = req.query.product_id;
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  const start = (page - 1) * count;
  const end = start + +count;

  db.getQuestions(productId, start, end, (err, data) => {
    if (err) {
      console.log(`THIS IS AN ERROR:${err}`);
      res.status(500).send(err);
      return;
    }
    console.log('YOU DID IT');
    res.send(data);
  });
  // res.send(req.query);
});

app.get(`/qa/questions/:question_id/answers`, (req, res) => {
  console.log(req.query);
  console.log(req.params);
  // expect page count and product id
  if (!req.params.question_id || typeof +req.params.question_id !== 'number') {
    res.status(401).send('invalid');
    return;
  }
  const questionId = req.params.question_id;
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  const start = (page - 1) * count;
  const end = start + +count;

  db.getAnswers(questionId, start, end, (err, data) => {
    if (err) {
      console.log(`THIS IS AN ERROR:${err}`);
      res.status(500).send(err);
      return;
    }
    console.log('YOU DID IT');
    res.send(data);
  });
  // res.send(req.query);
});

app.listen(port, () => {
  console.log(`listening on port:${port}`);
});

