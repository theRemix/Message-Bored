const express = require('express');
const messages = express.Router();
const { Message } = require('../../models');

messages.get('/', (req, res) =>
  Message.all().then( res.json.bind(res) )
);

module.exports = messages;


