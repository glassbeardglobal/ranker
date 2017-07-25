const mongoUtil = require('../helpers/mongoUtil.js');
const ObjectID = require('mongodb').ObjectID;

exports.all = function(callback) {
	mongoUtil.getDb().collection('ideas').find().toArray(function(err, result) {
		callback(err, result);
	});
};

exports.get = function(id, callback) {
  mongoUtil.getDb().collection('ideas').findOne({_id: ObjectID(id)}, function(err, result){
  	callback(err, result);
  })
};

exports.new = function (name, desc, rating, callback) {
	mongoUtil.getDb().collection('ideas').insertOne({name: name, desc: desc, rating: rating}, function(err, result) {
		callback(err, result);
	});
};

exports.update = function (id, newName, newDesc, newRating, callback) {
	mongoUtil.getDb().collection('ideas').updateOne({_id: ObjectID(id)}, {name: newName, desc: newDesc, rating: newRating}, function(err, result){
		callback(err);
	});
};

exports.delete = function (id, callback) {
	mongoUtil.getDb().collection('ideas').deleteOne({_id: ObjectID(id)}, function(err, result){
		callback(err);
	});
};
