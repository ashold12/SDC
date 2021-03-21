const makeQuestionPipeline = (id, start, end) => [
  { $match: { _id: +id } },
  { $unwind: '$questions' },
  { $match: { 'questions.reported': { $lt: 1 } } },
  { $sort: { 'questions.helpful': -1 } },
  { $group: { _id: '$_id', questions: { $push: '$questions' } } },
  { $project: { _id: 1, questions: { $slice: ['$questions', start, end] } } },
  { $unwind: '$questions' },
  {
    $lookup: {
      from: 'groupansphotos',
      let: { question_id: '$questions._id' },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ['$_id', '$$question_id'] },
          },
        },
        { $unwind: '$answers' },
        { $match: { 'answers.reported': { $lt: 1 } } },
        { $sort: { 'answers.helpful': -1 } },
        { $limit: 2 },
        {
          $project: {
            _id: 0,
            k: { $toString: '$answers._id' }, // k
            v: '$$ROOT.answers', // v
          },
        },
      ],
      as: 'answers',
    },
  },
  {
    $match: {
      $expr: {
        $gt: [{ $size: '$answers' }, 0],
      },
    },
  },
  {
    $addFields: {
      answers: { $arrayToObject: '$answers' },
    },
  },
  {
    $group: {
      _id: '$_id',
      questions: {
        $push: {
          question_id: '$questions._id',
          question_body: '$questions.body',
          question_date: '$questions.date_written',
          asker_name: '$questions.asker_name',
          question_helpfulness: '$questions.helpful',
          reported: '$questions.reported',
          answers: '$answers',
        },
      },
    },
  },
];

module.exports = {
  makeQuestionPipeline,
};

/*
db.prodquests.aggregate([
  { $match: { _id: 1 } },
  { $unwind: '$questions' },
  { $match: { 'questions.reported': { $lt: 1 } } },
  { $sort: { 'questions.helpful': -1 } },
  { $group: { _id: '$_id', questions: { $push: '$questions' } } },
  { $project: { _id: 1, questions: { $slice: ['$questions', 0, 100] } } },
  { $unwind: '$questions' },
  {
    $lookup: {
      from: 'groupansphotos',
      let: { question_id: '$questions._id' },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ['$_id', '$$question_id'] },
          },
        },
        { $unwind: '$answers' },
        { $match: { 'answers.reported': { $lt: 1 } } },
        { $sort: { 'answers.helpful': -1 } },
        {
          $project: {
            _id: 0,
            k: { $toString: '$answers._id' },
            v: '$$ROOT.answers',
          },
        },
      ],
      as: 'answers',
    },
  },
  {
    $match: {
      $expr: {
        $gt: [{ $size: '$answers' }, 0],
      },
    },
  },
  {
    $addFields: {
      answers: { $arrayToObject: '$answers' },
    },
  },
  {
    $group: {
      _id: '$_id',
      questions: {
        $push: {
          question_id: '$questions._id',
          question_body: '$questions.body',
          question_date: '$questions.date_written',
          asker_name: '$questions.asker_name',
          question_helpfulness: '$questions.helpful',
          reported: '$questions.reported',
          answers: '$answers',
        },
      },
    },
  },
])
*/