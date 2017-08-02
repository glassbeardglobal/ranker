const mongoUtil = require('../helpers/mongoUtil.js');
const ObjectID = require('mongodb').ObjectID;

exports.all = function(callback) {
  mongoUtil.getDb().collection('users').find().toArray(function(err, result) {
    callback(err, result);
  });
};

exports.get = function(id, callback) {
  mongoUtil.getDb().collection('users').findOne({_id: ObjectID(id)}, function(err, result){
    callback(err, result);
  });
};

exports.new = function (username, password, callback) {
  mongoUtil.getDb().collection('users').insertOne({username: username, password: password}, function(err, result) {
    callback(err, result);
  });
};

exports.update = function (id, newUsername, newPassword, callback) {
  mongoUtil.getDb().collection('users').updateOne({_id: ObjectID(id)}, {username: newUsername, password: newPassword}, function(err, result){
    callback(err);
  });
};

exports.delete = function (id, callback) {
  mongoUtil.getDb().collection('users').deleteOne({_id: ObjectID(id)}, function(err, result){
    callback(err);
  });
};