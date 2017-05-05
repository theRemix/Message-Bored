const express = require('express');
const messages = express.Router();
const { Message, User, Topic } = require('../../models');
const latest_limit = 5;

messages.get('/', (req, res) =>
  Message.all({
    include: [
      {
        model: User,
        as: 'Author'
      }
    ]
  }).then( res.json.bind(res) )
);

messages.get('/latest', (req, res) =>
  Message.all({
    include: [
      {
        model: User,
        as: 'Author'
      },
      {
        model: Topic,
        as: 'Topic'
      }
    ],
    order: [
      ['updatedAt', 'DESC']
    ],
    limit : latest_limit
  }).then( res.json.bind(res) )
);

messages.post('/', (req, res) =>
  Message.create( req.body )
    .then( res.json.bind(res) )
    .catch( res.json.bind(res) )
);

module.exports = messages;


