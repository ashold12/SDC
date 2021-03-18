const mongoose = require('mongoose');

const dbName = 'sdc';
const url = `mongodb://127.0.0.1:27017/${dbName}`;

mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection

// check success
db.once('open', () => {
  console.log('Database connected:', url);
});

db.on('error', (err) => {
  console.error('connection error:', err);
});
