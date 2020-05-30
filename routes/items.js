const router = require('express').Router();

const Item = require('../models/items');
const { successRes, errorRes, notFound } = require('../common/response');

router.get('/', async (req, res) => {
	Item.find({}, { __v: 0 }, (error, docs) => {
		return error ? errorRes(req, res, error) : successRes(req, res, docs, 200);
	});
});

router.post('/', (req, res) => {
	new Item({
		...req.body,
		createdOn: new Date()
	}).save((error, data) => {
		if(error) return errorRes(req, res, error, 500);
		delete data._doc.__v;
		return successRes(req, res, data._doc, 201);
	});
});

router.get('/:id', (req, res) => {
	Item.findById(req.params.id, { __v: 0 }, (error, doc) => {
		if(error) return errorRes(req, res, error, 500);
		return doc ? successRes(req, res, doc, 200) : notFound(req, res, 'Item not found.');
	});
});

router.put('/:id', (req, res) => {
	Item.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true, projection : { __v: 0 } }, (error, doc) => {
		if(error) return errorRes(req, res, error, 500);
		return doc ? successRes(req, res, doc, 200) : notFound(req, res, 'Item not found.');
	});
});

router.delete('/:id', (req, res) => {
	Item.findByIdAndDelete(req.params.id, (error, data) => {
		return error ? errorRes(req, res, error, 500) : successRes(req, res, data, 200);
	});
});

module.exports = router;