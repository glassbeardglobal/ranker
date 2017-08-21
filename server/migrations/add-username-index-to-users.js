const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(process.env.DB_URL, (err, db) => {
  if (err) console.log(err);
  db.collection('users').createIndex({ username: 1 }, (err2, result) => {
    if (err2) console.log(err2);
    else console.log(result);
  });
});
