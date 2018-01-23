'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    host: process.env.host || '',
    dbURI: process.env.dbURI,
    fb: {
      clientID: process.env.fbClientId,
      clientSecret: process.env.fbClientSecret,
      callbackURL: process.env.host + "/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'photos']
    }
  };
} else {
  module.exports = require('./development.json');
}