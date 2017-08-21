const ObjectID = require('mongodb').ObjectID;

const mongoUtil = require('../helpers/mongoUtil.js');
const cryptoUtil = require('../helpers/cryptoUtil.js');

const collectionName = 'users';

exports.all = (callback) => {
  mongoUtil.getDb().collection(collectionName).find().toArray((err, result) => {
    callback(err, result);
  });
};

exports.get = (id, callback) => {
  mongoUtil.getDb().collection(collectionName).findOne({ _id: ObjectID(id) }, (err, result) => {
    callback(err, result);
  });
};

exports.new = (username, password, isAdmin, callback) => {
  const hashResult = cryptoUtil.saltHashPassword(password);
  mongoUtil.getDb().collection(collectionName).insertOne({
    username,
    password: hashResult.passwordHash,
    salt: hashResult.salt,
    isAdmin,
  }, (err, result) => {
    callback(err, result);
  });
};

exports.update = (id, newUsername, newPassword, callback) => {
  const hashResult = cryptoUtil.saltHashPassword(newPassword);
  mongoUtil.getDb().collection(collectionName).updateOne({ _id: ObjectID(id) }, {
    username: newUsername,
    password: hashResult.passwordHash,
    salt: hashResult.salt,
  }, (err) => {
    callback(err);
  });
};

exports.delete = (id, callback) => {
  mongoUtil.getDb().collection(collectionName).deleteOne({ _id: ObjectID(id) }, (err) => {
    callback(err);
  });
};
