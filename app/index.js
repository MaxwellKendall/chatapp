'use strict';
const router = require('express').Router();

require('./auth')();

module.exports = {
  router: require('./routes')(),
  session: require('./session'),
}
