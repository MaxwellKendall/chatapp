'use strict';

const config = require('../config');
const mongoose = require('mongoose').connect(config.dbURI);

// mongoose.connection.on('error', error => {
//   console.log("MongoDB Error: ", error);
// });

module.exports = {
  mongoose
}
