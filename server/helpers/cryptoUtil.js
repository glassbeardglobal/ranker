const crypto = require('crypto');

let genRandomString = function(length) {
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
}

let sha512 = function(password, salt){
  let hash = crypto.createHmac('sha512', salt); 
  hash.update(password);
  let value = hash.digest('hex');
  return {
      salt: salt,
      passwordHash: value
  };
}

module.exports = {

  saltHashPassword: function(userpassword, callback) {
    let salt = genRandomString(16); 
    let passwordData = sha512(userpassword, salt);

    callback(passwordData);
  },

  getHashFromSalt: function(userpassword, salt, callback) {
    let passwordData = sha512(userpassword, salt.toString('hex'));
    callback(passwordData.passwordHash);
  }
};