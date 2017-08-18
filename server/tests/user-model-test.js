/* eslint-disable import/no-extraneous-dependencies */
const sinon = require('sinon');

const user = require('../models/user.js');
const mongoUtil = require('../helpers/mongoUtil.js');
const cryptoUtil = require('../helpers/cryptoUtil.js');
const ObjectID = require('mongodb').ObjectID;

describe('User', () => {
  const testID = '597bbc564460d8074395ef8e';

  afterEach(() => {
    mongoUtil.getDb.restore();
  });

  describe('#get()', () => {
    it('should call findOne(id) on db', () => {
      const callback = sinon.spy();
      sinon.stub(mongoUtil, 'getDb').returns({
        collection: sinon.stub().returns({ findOne: callback }),
      });

      user.get(testID);
      sinon.assert.calledWith(callback, { _id: ObjectID(testID) });
    });
  });

  describe('#new()', () => {
    it('should call insertOne(id) on db', () => {
      const callback = sinon.spy();

      sinon.stub(cryptoUtil, 'saltHashPassword').callsArgWith(1, { salt: 'salt', passwordHash: 'hashed password' });

      sinon.stub(mongoUtil, 'getDb').returns({
        collection: sinon.stub().returns({ insertOne: callback }),
      });

      user.new('username', 'password', false);
      sinon.assert.calledWith(callback, { username: 'username', password: 'hashed password', salt: 'salt', isAdmin: false });

      cryptoUtil.saltHashPassword.restore();
    });
  });

  describe('#update()', () => {
    it('should call updateOne(id) on db', () => {
      const callback = sinon.spy();

      sinon.stub(cryptoUtil, 'saltHashPassword').callsArgWith(1, { salt: 'salt', passwordHash: 'hashed password' });

      sinon.stub(mongoUtil, 'getDb').returns({
        collection: sinon.stub().returns({ updateOne: callback }),
      });

      user.update(testID, 'username', 'password');
      sinon.assert.calledWith(callback, { _id: ObjectID(testID) }, { username: 'username', password: 'hashed password', salt: 'salt' });

      cryptoUtil.saltHashPassword.restore();
    });
  });

  describe('#delete()', () => {
    it('should call deleteOne(id) on db', () => {
      const callback = sinon.spy();
      sinon.stub(mongoUtil, 'getDb').returns({
        collection: sinon.stub().returns({ deleteOne: callback }),
      });

      user.delete(testID);
      sinon.assert.calledWith(callback, { _id: ObjectID(testID) });
    });
  });
});
