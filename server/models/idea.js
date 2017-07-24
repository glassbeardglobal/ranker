const mongoUtil = require('../helpers/mongoUtil.js');

exports.all = function(callback) {
	mongoUtil.getDb().collection('ideas').find().toArray(function(err, result) {
		if (err) throw err;
		callback(result);
	});
};

exports.get = function(name, callback) {
  mongoUtil.getDb().collection('ideas').find({name: name}).toArray(function(err, result) {
    if (err) throw err;
    callback(result);
  });
};

exports.new = function (name, desc, rating) {
	mongoUtil.getDb().collection('ideas').insertOne({name: name, desc: desc, rating: rating});
};

exports.update = function (name, newName, newDesc, newRating) {
	mongoUtil.getDb().collection('ideas').updateOne({name: name}, {name: newName, desc: newDesc, rating: newRating});
};

exports.delete = function (name) {
	mongoUtil.getDb().collection('ideas').deleteOne({name: name});
};
