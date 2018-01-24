'use strict';
const router = require('express').Router();
const db = require('../db');
const crypto = require('crypto');

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

let findById = id => {
  return new Promise((resolve, reject) => {
    db.userModel.findById(id, (error, user) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
}

let route = routes => {
  _registerRoutes(routes);
  return router;
}

// find a single user based on a key 
let findOne = profileId => {
  return db.userModel.findOne({
    'profileId': profileId,
  })
}

// create a new user
let createNewUser = profile => {
  return new Promise((resolve, reject) => {
    let newChatUser = new db.userModel({
      profileId: profile.id,
      fullName: profile.displayName,
      profilePic: profile.photos[0].value || '',
    });

    newChatUser.save(error => {
      if (error) {
        reject(error);
      } else {
        resolve(newChatUser);
      }
    })
  });
}

let isAuthenticated = (req, res, next) => {
  if (req.user){
    next();
  } else {
    res.redirect('/');
  }
}

const doesNewRoomExist =(allrooms, room) => {
  let findRoom = allrooms.findIndex((el, index, array) => {
    if (el.room === room) {
      return true;
    } else {
      return false;
    }
  });
  return findRoom > -1 ? true : false;
}

const generateId = () => {
  return crypto.randomBytes(24).toString('hex');
}

const findRoomById = (allrooms, id) => {
  return allrooms.find((el) => {
    if (el.roomID === id) {
      return true;
    } else {
      return false;
    }
  });
}

module.exports = {
  route,
  findOne,
  createNewUser,
  findById,
  isAuthenticated,
  doesNewRoomExist,
  generateId,
  findRoomById,
}
