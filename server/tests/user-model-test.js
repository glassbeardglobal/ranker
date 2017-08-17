const sinon = require('sinon');
const assert = require('chai').assert;

const user = require('../models/user.js');
const mongoUtil = require('../helpers/mongoUtil.js');
const cryptoUtil = require('../helpers/cryptoUtil.js');
const ObjectID = require('mongodb').ObjectID;

describe('User', function(){
  const testID = "597bbc564460d8074395ef8e";

  afterEach(function() {
    mongoUtil.getDb.restore();
  });

  describe('#get()', function(){
    it('should call findOne(id) on db', function(){
      let callback = sinon.spy();
      sinon.stub(mongoUtil, 'getDb').returns({
        collection: sinon.stub().returns({findOne: callback})
      });

      user.get(testID, function(err, result){});
      sinon.assert.calledWith(callback, {"_id": ObjectID(testID)});
    });
  });

  describe('#new()', function(){
    it('should call insertOne(id) on db', function(){
      let callback = sinon.spy();

      sinon.stub(cryptoUtil, 'saltHashPassword').callsArgWith(1, {salt: 'salt', passwordHash: 'hashed password'});

      sinon.stub(mongoUtil, 'getDb').returns({
        collection: sinon.stub().returns({insertOne: callback})
      });

      user.new("username", "password", 10, function(err, result){});
      sinon.assert.calledWith(callback, {username: 'username', password: 'hashed password', salt: 'salt'}); 

      cryptoUtil.saltHashPassword.restore();     
    });
  });

  describe('#update()', function(){
    it('should call updateOne(id) on db', function(){
      let callback = sinon.spy();

      sinon.stub(cryptoUtil, 'saltHashPassword').callsArgWith(1, {salt: 'salt', passwordHash: 'hashed password'});

      sinon.stub(mongoUtil, 'getDb').returns({
        collection: sinon.stub().returns({updateOne: callback})
      });

      user.update(testID, "username", "password", function(err, result){});
      sinon.assert.calledWith(callback, {"_id": ObjectID(testID)}, {username: 'username', password: 'hashed password', salt: 'salt'}); 

      cryptoUtil.saltHashPassword.restore();     
    });
  });

  describe('#delete()', function(){
    it('should call deleteOne(id) on db', function(){
      let callback = sinon.spy();
      sinon.stub(mongoUtil, 'getDb').returns({
        collection: sinon.stub().returns({deleteOne: callback})
      });

      user.delete(testID, function(err, result){});
      sinon.assert.calledWith(callback, {"_id": ObjectID(testID)});     
    });
  });
});
