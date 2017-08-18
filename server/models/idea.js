const ObjectID = require('mongodb').ObjectID;

const mongoUtil = require('../helpers/mongoUtil.js');

exports.all = (callback) => {
  mongoUtil.getDb().collection('ideas').find().toArray((err, result) => {
    callback(err, result);
  });
};

exports.get = (id, callback) => {
  mongoUtil.getDb().collection('ideas').findOne({ _id: ObjectID(id) }, (err, result) => {
    callback(err, result);
  });
};

exports.new = (name, desc, rating, callback) => {
  mongoUtil.getDb().collection('ideas').insertOne({ name, desc, rating }, (err, result) => {
    callback(err, result);
  });
};

exports.update = (id, newName, newDesc, newRating, callback) => {
  mongoUtil.getDb().collection('ideas').updateOne({ _id: ObjectID(id) }, { name: newName, desc: newDesc, rating: newRating }, (err) => {
    callback(err);
  });
};

exports.delete = (id, callback) => {
  mongoUtil.getDb().collection('ideas').deleteOne({ _id: ObjectID(id) }, (err) => {
    callback(err);
  });
};
