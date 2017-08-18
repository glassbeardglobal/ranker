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
  cryptoUtil.saltHashPassword(password, (hashResult) => {
    mongoUtil.getDb().collection('users').insertOne({ username, password: hashResult.passwordHash, salt: hashResult.salt, isAdmin }, (err, result) => {
      callback(err, result);
    });
  });
};

exports.update = (id, newUsername, newPassword, callback) => {
  cryptoUtil.saltHashPassword(newPassword, (hashResult) => {
    mongoUtil.getDb().collection('users').updateOne({ _id: ObjectID(id) }, { username: newUsername, password: hashResult.passwordHash, salt: hashResult.salt }, (err) => {
      callback(err);
    });
  });
};

exports.delete = (id, callback) => {
  mongoUtil.getDb().collection('users').deleteOne({ _id: ObjectID(id) }, (err) => {
    callback(err);
  });
};
