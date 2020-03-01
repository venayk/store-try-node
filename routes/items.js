const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Item = require('../models/items');
const { successRes, errorRes, notFound } = require('../common/response');

router.get('/', (req, res) => {
	Item.find({}, { __v: 0 }, (error, docs) => {
		if(error){
			return errorRes(req, res, error);
		}
		return successRes(req, res, docs, 200);
	});
});

router.post('/', (req, res) => {
	console.log(req.body);
	let item = new Item({
		...req.body,
		_id: new mongoose.Types.ObjectId(),
		createdOn: new Date()
	});
	item.save((error, data) => {
		if(error){
			return errorRes(req, res, error, 500);
		}
		delete data._doc.__v;
		return successRes(req, res, data._doc, 200);
	});
});

router.get('/:id', (req, res) => {
	let query = {
		_id: req.params.id
	};
	Item.findOne(query,{ __v: 0 }, (error, docs) => {
		if(!docs){
			return notFound(req, res);
		}
		if(error){
			return errorRes(req, res, error, 500);
		}
		return successRes(req, res, docs, 200);
	});
});

router.delete('/:id', (req, res) => {
	Item.findByIdAndDelete(req.params.id, (error, data) => {
		if(error){
			return errorRes(req, res, error, 500);
		}
		return successRes(req, res, data, 200);
	});
});

module.exports = router;