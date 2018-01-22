'use strict';
const express = require('express');
const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use(express.static('public')); // built in middleware function to handle static assets.

app.get('/', (req, res, next) => {
  res.render('login', {
    pageTitle: 'My Login Page',
  });
  console.log(req.hello);
});

app.get('/dashboard', (req, res, next) => {
  res.send(`<h1>This is the dashboard page Middleware says: ${req.hello}</h1>`);
});

app.listen(app.get('port'), () => {
  console.log('chat app running on port: ', app.get('port'));
});
