const ObjectID = require('mongodb').ObjectID;

const mongoUtil = require('../helpers/mongoUtil.js');
const cryptoUtil = require('../helpers/cryptoUtil.js');

exports.all = (callback) => {
  mongoUtil.getDb().collection('users').find().toArray((err, result) => {
    callback(err, result);
  });
};

exports.get = (id, callback) => {
  mongoUtil.getDb().collection('users').findOne({ _id: ObjectID(id) }, (err, result) => {
    callback(err, result);
  });
};

exports.new = (username, password, isAdmin, callback) => {
  const hashResult = cryptoUtil.saltHashPassword(password);
  mongoUtil.getDb().collection('users').insertOne({ username, password: hashResult.passwordHash, salt: hashResult.salt, isAdmin }, (err, result) => {
    callback(err, result);
  });
};

exports.update = (id, newUsername, newPassword, callback) => {
  const hashResult = cryptoUtil.saltHashPassword(newPassword);
  mongoUtil.getDb().collection('users').updateOne({ _id: ObjectID(id) }, { username: newUsername, password: hashResult.passwordHash, salt: hashResult.salt }, (err) => {
    callback(err);
  });
};

exports.delete = (id, callback) => {
  mongoUtil.getDb().collection('users').deleteOne({ _id: ObjectID(id) }, (err) => {
    callback(err);
  });
};
