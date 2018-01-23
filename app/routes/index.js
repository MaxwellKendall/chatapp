'use strict';
const h = require('../helpers');
const passport = require('passport');

module.exports = () => {
  let routes = {
    'get': {
      '/': (req, res, next) => {
        res.render('login', { pageTitle: 'test'});
      },
      '/rooms': (req, res, next) => {
        res.render('rooms');
      },
      '/chat': (req, res, next) => {
        res.render('chatroom');
      },
      '/getsession': (req, res, next) => {
        res.send(`My favourite color: ${req.session.favColor}`);
      },
      '/auth/facebook': passport.authenticate('facebook'),
      '/auth/facebook/callback': passport.authenticate('facebook', {
        successRedirect: '/rooms',
        failureRedirect: '/'
      }),
      '/logout': (req, res, next) => {
          req.logout(); // removes req.user
          res.redirect('/'); // redirects to / route
      },
    },
    'post': {},
    'NA': (req, res, next) => {
      res.status(404).sendFile(`${process.cwd()}/views/404.htm`);
    }
  }

  return h.route(routes);
}
