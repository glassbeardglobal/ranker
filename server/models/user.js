const mongoUtil = require('../helpers/mongoUtil.js');
const cryptoUtil = require('../helpers/cryptoUtil.js');
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

exports.new = function (username, password, isAdmin, callback) {
  cryptoUtil.saltHashPassword(password, function(result){
    mongoUtil.getDb().collection('users').insertOne({username: username, password: result.passwordHash, salt: result.salt, isAdmin: isAdmin}, function(err, result) {
      callback(err, result);
    });
  });
};

exports.update = function (id, newUsername, newPassword, callback) {
  cryptoUtil.saltHashPassword(newPassword, function(result){  
    mongoUtil.getDb().collection('users').updateOne({_id: ObjectID(id)}, {username: newUsername, password: result.passwordHash, salt: result.salt}, function(err, result){
      callback(err);
    });
  });
};

exports.delete = function (id, callback) {
  mongoUtil.getDb().collection('users').deleteOne({_id: ObjectID(id)}, function(err, result){
    callback(err);
  });
};
