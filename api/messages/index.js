const express = require('express');
const messages = express.Router();
const { Message, User } = require('../../models');

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

messages.post('/', (req, res) =>
  Message.create( req.body )
    .then( res.json.bind(res) )
    .catch( res.json.bind(res) )
);

module.exports = messages;


