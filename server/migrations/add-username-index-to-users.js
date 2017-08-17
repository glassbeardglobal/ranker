const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(process.env.DB_URL, function(err, db){
  db.collection('users').createIndex({username: 1}, function(err, result){
    if(err) console.log(err);
    else console.log(result);
  });
});