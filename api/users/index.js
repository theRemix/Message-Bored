const express = require('express');
const users = express.Router();
const { User } = require('../../models');

users.get('/', (req, res) =>
  User.all().then( res.json.bind(res) )
);

module.exports = users;

