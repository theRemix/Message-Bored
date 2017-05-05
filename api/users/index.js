const express = require('express');
const users = express.Router();
const { User, Message } = require('../../models');

users.get('/', (req, res) =>
  User.all().then( res.json.bind(res) )
);

users.post('/', (req, res) =>
  User.create(req.body)
    .then( res.json.bind(res) )
    .catch( res.json.bind(res) )
);

users.get('/:id', (req, res) =>
  User.findById(req.params.id, {
    include: [
      {
        model: Message,
        as: 'Author'
      }
    ]
  }).then( res.json.bind(res) )
);

module.exports = users;

