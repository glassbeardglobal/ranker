/* eslint-disable import/no-extraneous-dependencies */
const sinon = require('sinon');

const idea = require('../models/idea.js');
const mongoUtil = require('../helpers/mongoUtil.js');
const ObjectID = require('mongodb').ObjectID;

describe('Idea', () => {
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

      idea.get(testID);
      sinon.assert.calledWith(callback, { _id: ObjectID(testID) });
    });
  });

  describe('#new()', () => {
    it('should call insertOne(id) on db', () => {
      const callback = sinon.spy();
      sinon.stub(mongoUtil, 'getDb').returns({
        collection: sinon.stub().returns({ insertOne: callback }),
      });

      idea.new('test', 'new idea', 10);
      sinon.assert.calledWith(callback, { name: 'test', desc: 'new idea', rating: 10 });
    });
  });

  describe('#update()', () => {
    it('should call updateOne(id) on db', () => {
      const callback = sinon.spy();
      sinon.stub(mongoUtil, 'getDb').returns({
        collection: sinon.stub().returns({ updateOne: callback }),
      });

      idea.update(testID, 'test', 'update idea', 8);
      sinon.assert.calledWith(callback, { _id: ObjectID(testID) }, { name: 'test', desc: 'update idea', rating: 8 });
    });
  });

  describe('#delete()', () => {
    it('should call deleteOne(id) on db', () => {
      const callback = sinon.spy();
      sinon.stub(mongoUtil, 'getDb').returns({
        collection: sinon.stub().returns({ deleteOne: callback }),
      });

      idea.delete(testID);
      sinon.assert.calledWith(callback, { _id: ObjectID(testID) });
    });
  });
});
