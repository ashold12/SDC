const mongoose = require('mongoose');
const pipelines = require('./pipelines.js');

const dbName = 'sdc-test'; // <--- WORKING ON TEST DATABASE
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
});

const questionSchema = mongoose.Schema({
  _id: { type: Number, unique: true },
  body: { type: String, max: 60 },
  date_written: String,
  asker_name: { type: String, max: 60 },
  asker_email: { type: String, max: 60 },
  reported: { type: Number, default: 0 },
  helpful: { type: Number, default: 0 },
});

const photoSchema = mongoose.Schema({
  url: String,
});

const answerSchema = mongoose.Schema({
  _id: { type: Number, unique: true },
  body: { type: String, max: 60 },
  date_written: String,
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
  ProdQuest.aggregate(pipelines.makeQuestionPipeline(id, start, end))
    .then((result) => cb(null, result))
    .catch((err) => cb(err));
};

const getAnswers = (id, start, end, cb) => {
  GroupAnsPhotos.aggregate([
    { $match: { _id: +id } },
    { $unwind: '$answers' },
    { $match: { 'answers.reported': { $lt: 1 } } },
    { $sort: { 'answers.helpful': -1 } },
    { $group: { _id: '$_id', answers: { $push: '$answers' } } },
  ])
    .then((result) => cb(null, result))
    .catch((err) => cb(err));
};

const postQuestion = (questionData, cb) => {
  const { body, name, email, product_id } = questionData;
  const date = new Date().toISOString();
  // console.log('2018-04-04'.toISOString());
  KeyStore.find({ _id: 'questions' }, { _id: 0, value: 1 })
    .then((value) => {
      const question = {
        _id: value[0].value,
        body,
        date_written: date,
        asker_name: name,
        asker_email: email,
        reported: 0,
        helpful: 0,
      };
      ProdQuest.findOneAndUpdate({ _id: product_id }, { $push: { questions: question } })
        .then(() => {
          KeyStore.findOneAndUpdate({ _id: 'questions' }, { $inc: { value: 1 } })
            .then((data) => cb(null, data))
            .catch((err) => cb(err));
        })
        .catch((err) => cb(err));
    })
    .catch((err) => cb(err));
};

const postAnswer = (answer, questionId, cb) => {
  KeyStore.find({ _id: 'answers' }, { _id: 0, value: 1 })
    .then((value) => {
      answer._id = value[0].value;
      GroupAnsPhotos.findOneAndUpdate({ _id: questionId }, { $push: { answers: answer } })
        .then(() => {
          KeyStore.findOneAndUpdate({ _id: 'answers' }, { $inc: { value: 1 } })
            .then((data) => cb(null, data))
            .catch((err) => cb(err));
        })
        .catch((err) => cb(err));
    })
    .catch((err) => cb(err));
};

// mark helpfuls
const answerHelpful = (answerId, cb) => {
  GroupAnsPhotos.updateOne({ 'answers._id': answerId }, { $inc: { 'answers.$.helpful': 1 } })
    .then((result) => cb(null, result))
    .catch((err) => cb(err));
};
const questionHelpful = (questionId, cb) => {
  ProdQuest.updateOne({ 'questions._id': questionId }, { $inc: { 'questions.$.helpful': 1 } })
    .then((result) => cb(null, result))
    .catch((err) => cb(err));
};

// mark reported
const answerReport = (answerId, cb) => {
  GroupAnsPhotos.updateOne({ 'answers._id': answerId }, { $inc: { 'answers.$.reported': 1 } })
    .then((result) => cb(null, result))
    .catch((err) => cb(err));
};

const questionReport = (questionId, cb) => {
  ProdQuest.updateOne({ 'questions._id': questionId }, { $inc: { 'questions.$.reported': 1 } })
    .then((result) => cb(null, result))
    .catch((err) => cb(err));
};

module.exports = {
  getQuestions,
  getAnswers,
  postQuestion,
  postAnswer,
  answerHelpful,
  questionHelpful,
  answerReport,
  questionReport,
};

//working query nesting answers in questions

/*
const makeQuestionPipeline = (id, start, end) => ([
  { $match: { _id: +id } },
  { $unwind: '$questions' },
  { $match: { 'questions.reported': { $lt: 1 } } },
  { $sort: { 'questions.helpful': -1 } },
  { $group: { _id: '$_id', questions: { $push: '$questions' } } },
  { $project: { _id: 1, questions: { $slice: ['$questions', start, end] } } },
  { $unwind: '$questions' },
  {
      $lookup: {
          from: "groupansphotos",
          let: { question_id: "$questions._id" },
          pipeline: [
              {
                  $match: {
                      $expr: { $eq: ["$_id", "$$question_id"] }
                  }
              },
              { $unwind: "$answers" },
              {
                  $project: {
                      _id: 0,
                      k: { $toString: "$answers._id" },
                      v: "$$ROOT.answers"
                  }
              }
          ],
          as: "answers"
      }
  },
  {
      $match: {
          $expr: {
              $gt: [{ $size: "$answers" }, 0]
          }
      }
  },
  {
      $addFields: {
          answers: { $arrayToObject: "$answers" }
      }
  },
  {
      $group: {
          _id: "$_id",
          questions: {
              $push: {
                  question_id: "$questions._id",
                  question_body: "$questions.body",
                  question_date: "$questions.date_written",
                  asker_name: "$questions.asker_name",
                  question_helpfulness: "$questions.helpful",
                  reported: "$questions.reported",
                  answers: "$answers"
              }
          }
      }
  }
])
*/