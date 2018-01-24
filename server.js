'use strict';
const express = require('express');
const app = express();
const config = require('./app/config');
const mongoose = require('mongoose');
mongoose.connect(config.dbURI);

const chatApp = require('./app');
const passport = require('passport');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(chatApp.session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', chatApp.router);

app.get('/dashboard', (req, res, next) => {
  res.send(`<h1>This is the dashboard page Middleware says: ${req.hello}</h1>`);
});

chatApp.ioServer(app).listen(app.get('port'), () => {
  console.log('chat app running on port: ', app.get('port'));
});
