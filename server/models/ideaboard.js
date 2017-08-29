const ObjectID = require('mongodb').ObjectID;

const mongoUtil = require('../helpers/mongoUtil.js');

const collectionName = 'ideaboards';

exports.all = (callback) => {
  mongoUtil.getDb().collection(collectionName).find({}, { name: 1 }).toArray((err, result) => {
    callback(err, result);
  });
};

exports.get = (id, callback) => {
  mongoUtil.getDb().collection(collectionName).findOne({ _id: ObjectID(id) }, (err, result) => {
    callback(err, result);
  });
};

exports.getUserBoards = (userID, callback) => {
  mongoUtil.getDb().collection(collectionName).find({
    members: { $all: [userID] } }).toArray(
  (err, result) => {
    callback(err, result);
  });
};

exports.new = (name, owner, callback) => {
  mongoUtil.getDb().collection(collectionName).insertOne({
    name,
    owner,
    members: [owner],
  }, (err, result) => {
    callback(err, result);
  });
};

exports.update = (id, newName, membersToAdd, membersToRemove, callback) => {
  mongoUtil.getDb().collection(collectionName).updateOne({ _id: ObjectID(id) }, {
    $set: { name: newName },
    $pushAll: { members: membersToAdd },
  }, (err) => {
    if (err) return callback(err);
    mongoUtil.getDb().collection(collectionName).updateOne({ _id: ObjectID(id) }, {
      $pull: { members: { $in: membersToRemove } },
    }, (err2) => {
      callback(err2);
    });
  });
};

exports.delete = (id, callback) => {
  mongoUtil.getDb().collection(collectionName).deleteOne({ _id: ObjectID(id) }, (err) => {
    callback(err);
  });
};
