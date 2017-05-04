const express = require('express');
const topics = express.Router();
const { Topic } = require('../../models');

topics.get('/', (req, res) =>
  Topic.all().then( res.json.bind(res) )
);

module.exports = topics;


