'use strict';
const router = require('express').Router();

// auth logic
require('./auth')();

// creating http for socket
let ioServer = (app) => {
  app.locals.chatrooms = [];
  const server = require('http').Server(app);
  const io = require('socket.io')(server);
  io.use((socket, next) => {
    // for each socket instance, fetch the session data based on the socket.request object?
    require('./session')(socket.request, {}, next);
  })
  require('./socket')(io, app);
  return server;
}
module.exports = {
  router: require('./routes')(),
  session: require('./session'),
  ioServer,
}
