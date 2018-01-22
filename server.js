'use strict';
const express = require('express');
const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', './views'); // sets where ejs should look for views, by default is views
app.get('/', (req, res, next) => {
  // res.sendFile(`${__dirname}/views/login.htm`);
  res.render('login', {
    pageTitle: 'My Login Page',
  }); // uses ejs render method
  console.log(req.hello);
});

app.get('/dashboard', (req, res, next) => {
  res.send(`<h1>This is the dashboard page Middleware says: ${req.hello}</h1>`);
});

app.listen(app.get('port'), () => {
  console.log('chat app running on port: ', app.get('port'));
});
