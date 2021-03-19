const mongoose = require('mongoose');

const dbName = 'test-sdc'; // <--- WORKING ON TEST DATABASE
const url = `mongodb://127.0.0.1:27017/${dbName}`;

mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;

// check success
db.once('open', () => {
  console.log('Database connected:', url);
});

db.on('error', (err) => {
  console.error('connection error:', err);
});

const keyStoreSchema = mongoose.Schema({
  _id: String,
  value: Number,
})

const questionSchema = mongoose.Schema({
  body: { type: String, max: 60 },
  date_written: Date,
  asker_name: { type: String, max: 60 },
  asker_email: { type: String, max: 60 },
  reported: { type: Number, default: 0 },
  helpful: { type: Number, default: 0 },
});

const photoSchema = mongoose.Schema({
  url: String,
});

const answerSchema = mongoose.Schema({
  body: { type: String, max: 60 },
  date_written: Date,
  answerer_name: { type: String, max: 60 },
  answerer_email: { type: String, max: 60 },
  reported: Number,
  helpful: Number,
  photos: [photoSchema],
});

const prodQuestSchema = mongoose.Schema({
  _id: { type: Number, unique: true },
  questions: [questionSchema],
});

const groupansphotos = mongoose.Schema({
  // this ID is manually defined and matches the ID of the question
  _id: { type: Number, unique: true },
  answers: [answerSchema],
});

const ProdQuest = mongoose.model('ProdQuest', prodQuestSchema, 'prodquests');
const GroupAnsPhotos = mongoose.model('GroupAnsPhotos', groupansphotos, 'groupansphotos');
const KeyStore = mongoose.model('KeyStore', keyStoreSchema, 'keystore');

const getQuestions = (id, start, end, cb) => {
  ProdQuest.find({ _id: id })
    // still need sort
    .slice('questions', [start, end])
    .then((result) => cb(null, result))
    .catch((err) => cb(err));
};

const getAnswers = (id, start, end, cb) => {
  GroupAnsPhotos.findOne({ _id: id })
    .slice('answers', [start, end])
    .then((result) => cb(null, result))
    .catch((err) => cb(err));
};

const postQuestion = (question, cb) => {
  console.log(question);
  cb('hitting');
}

module.exports = {
  getQuestions,
  getAnswers,
  postQuestion,
};
