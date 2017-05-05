const express = require('express');
const topics = express.Router();
const { Topic, User } = require('../../models');

topics.get('/', (req, res) =>
  Topic.all({
    include: [
      {
        model: User,
        as: 'Creator'
      }
    ]
  })
  .then( res.json.bind(res) )
);

topics.post('/', (req, res) =>
  Topic.create( req.body )
    .then( res.json.bind(res) )
    .catch( res.json.bind(res) )
);

module.exports = topics;


