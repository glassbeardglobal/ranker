const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/rankerdb';

exports.all = function(callback) {
	MongoClient.connect(url, function(err, db) {
	  if(err)throw(err);

  	db.collection('ideas').find().toArray(function(err, result) {
  		if (err) throw err;
  		callback(result);
  	});
	});
};

exports.get = function(name, callback) {
	MongoClient.connect(url, function(err, db) {
	  if(err)throw(err);

	  db.collection('ideas').find({name: name}).toArray(function(err, result) {
	    if (err) throw err;
	    callback(result);
	  });
	});
};

exports.new = function (name, desc, rating) {
	MongoClient.connect(url, function(err, db) {
	  if(err)throw(err);
	  db.collection('ideas').insertOne({name: name, desc: desc, rating: rating});
	});
};

exports.update = function (name, newName, newDesc, newRating) {
	MongoClient.connect(url, function(err, db) {
	  if(err)throw(err);
	  db.collection('ideas').updateOne({name: name}, {name: newName, desc: newDesc, rating: newRating});
	});
};

exports.delete = function (name) {
	MongoClient.connect(url, function(err, db) {
	  if(err)throw(err);
	  db.collection('ideas').deleteOne({name: name});
	});
};