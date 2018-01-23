'use strict';
const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;
const h = require('../helpers');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); // makes available in req.user
  });

  passport.deserializeUser((id, done) => {
    h.findById(id)
      .then(user => done(null, user))
      .catch(error => console.log(`error on findById: ${error}`));
  })

  let authProcessor = (accessToken, refreshToken, profile, done) => {
    // does user exist, if not, create new user
    h.findOne(profile.id)
      .then(result => {
        if (result) {
          done(null, result);
        } else {
          // create a new user
          h.createNewUser(profile)
            .then(newChatUser => done(null, newChatUser))
            .catch(error => console.log('create new user error:', error))
        }
      })
  };
  passport.use(new FacebookStrategy(config.fbtest, authProcessor));
}