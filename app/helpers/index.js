'use strict';
const router = require('express').Router();

let _registerRoutes = (routes, method) => {
  for (let key in routes) {
    if (typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)) {
      _registerRoutes(routes[key], key);
    } else {
      // register the routes
      if(method === 'get') {
        router.get(key, routes[key]);
      } else if (method === 'post') {
        router.post(key, routes[key]);
      } else {
        router.use(routes[key]);
      }
    }    
  }
}

let route = routes => {
  _registerRoutes(routes);
  return router;
}

const connect = 'mongodb://admin:test12345@@ds111638.mlab.com:11638/chatapp5490'

module.exports = {
  route
}
