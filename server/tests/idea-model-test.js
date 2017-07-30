const sinon = require('sinon');
const assert = require('chai').assert;

const idea = require('../models/idea.js');
const mongoUtil = require('../helpers/mongoUtil.js');
const ObjectID = require('mongodb').ObjectID;

describe('Idea', function(){
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

			idea.get(testID, function(err, result){});
			sinon.assert.calledWith(callback, {"_id": ObjectID(testID)});
		});
	});

	describe('#new()', function(){
		it('should call insertOne(id) on db', function(){
			let callback = sinon.spy();
			sinon.stub(mongoUtil, 'getDb').returns({
					collection: sinon.stub().returns({insertOne: callback})
			});

			idea.new("test", "new idea", 10, function(err, result){});
			sinon.assert.calledWith(callback, {name: "test", desc: "new idea", rating: 10});			
		});
	});

	describe('#update()', function(){
		it('should call updateOne(id) on db', function(){
			let callback = sinon.spy();
			sinon.stub(mongoUtil, 'getDb').returns({
					collection: sinon.stub().returns({updateOne: callback})
			});

			idea.update(testID, "test", "update idea", 8, function(err, result){});
			sinon.assert.calledWith(callback, {"_id": ObjectID(testID)}, {name: "test", desc: "update idea", rating: 8});			
		});
	});

	describe('#delete()', function(){
		it('should call deleteOne(id) on db', function(){
			let callback = sinon.spy();
			sinon.stub(mongoUtil, 'getDb').returns({
					collection: sinon.stub().returns({deleteOne: callback})
			});

			idea.delete(testID, function(err, result){});
			sinon.assert.calledWith(callback, {"_id": ObjectID(testID)});			
		});
	});

});
