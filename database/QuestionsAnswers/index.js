const express = require('express');
const db = require('./db/index.js');

const app = express();
const port = 8080;
// const url = require('url');
// const querystring = require('querystring');

app.use(express.json());

app.get(`/qa/questions/`, (req, res) => {
  console.log(req.query);
  // expect page count and product id
  if (!req.query.product_id || typeof +req.query.product_id !== 'number') {
    res.status(401).send('invalid');
  }
  const product_id = req.query.product_id;
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  db.doSomething((response) => {
    res.send(response);
  });
  // res.send(req.query);
});

app.listen(port, () => {
  console.log(`listening on port:${port}`);
});

