const jwt = require('jsonwebtoken');

module.exports = {

  // route middleware to verify a token
  authenticate: function(req, res, next) {
    let token = req.body.token || req.headers['x-access-token'];
    if(token){
      jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
        console.l
        if(err){ 
          let error = new Error("Failed to authenticate token");
          error.status = 401;
          next(error);  
        }   
        else {
          req.decoded = decoded;    
          next();
        }
      });
    } 
    else{
      let error = new Error("No token provided");
      error.status = 403;
      next(error);
    }
  }
}
