'use strict';
const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('login', {
    pageTitle: 'My Login Page',
  });
  console.log(req.hello);
});

router.get('/info', (req, res, next) => {
  res.send('Test Page')
});

module.exports = {
  router,
}
