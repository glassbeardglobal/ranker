/* eslint-disable */
const mongodb = require('mongodb');

exports.up = function(db, next){
  db.collection('users').createIndex({ username: 1 }, { unique: true }, next);
  db.close();
};

exports.down = function(db, next){
  db.collection('users').dropIndex({ username: 1 }, next);
  db.close();
};
