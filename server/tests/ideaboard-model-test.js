const sinon = require('sinon');

const ideaboard = require('../models/ideaboard.js');
const mongoUtil = require('../helpers/mongoUtil.js');
const ObjectID = require('mongodb').ObjectID;

describe('Idea Board', () => {
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

      ideaboard.get(testID);
      sinon.assert.calledWith(callback, { _id: ObjectID(testID) });
    });
  });

  describe('#new()', () => {
    it('should call insertOne(id) on db', () => {
      const callback = sinon.spy();
      sinon.stub(mongoUtil, 'getDb').returns({
        collection: sinon.stub().returns({ insertOne: callback }),
      });

      ideaboard.new('test', 'owner');
      sinon.assert.calledWith(callback, { name: 'test', owner: 'owner', members: ['owner'] });
    });
  });

  describe('#update()', () => {
    it('should call updateOne(id) on db', () => {
      const callback = sinon.spy();
      sinon.stub(mongoUtil, 'getDb').returns({
        collection: sinon.stub().returns({ updateOne: callback }),
      });

      ideaboard.update(testID, 'name', ['add'], ['remove']);
      sinon.assert.calledWith(callback, { _id: ObjectID(testID) }, {
        $set: { name: 'name' },
        $pushAll: { members: ['add'] },
      });
    });
  });

  describe('#delete()', () => {
    it('should call deleteOne(id) on db', () => {
      const callback = sinon.spy();
      sinon.stub(mongoUtil, 'getDb').returns({
        collection: sinon.stub().returns({ deleteOne: callback }),
      });

      ideaboard.delete(testID);
      sinon.assert.calledWith(callback, { _id: ObjectID(testID) });
    });
  });
});
