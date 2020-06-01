const router = require('express').Router();

const Item = require('../models/items');
const defensive = require('../common/defensive');
const { successRes, errorRes, notFound } = require('../common/response');

router.get('/', async (req, res) => {
	const { error, data } = await defensive(Item.find({}, { __v: 0 }));
	return error ? errorRes(req, res, error) : successRes(req, res, data, 200);
});

router.post('/', async (req, res) => {
	const { error, data } = await defensive(new Item({ ...req.body, createdOn: new Date() }).save());
	if(error) return errorRes(req, res, error, 500);
	delete data._doc.__v;
	return successRes(req, res, data._doc, 201);
});

router.get('/:id', async (req, res) => {
	const { error, data } = await defensive(Item.findById(req.params.id, { __v: 0 }));
	if(error) return errorRes(req, res, error, 500);
	return data ? successRes(req, res, data, 200) : notFound(req, res, 'Item not found.');
});

router.put('/:id', async (req, res) => {
	const { error, data } = await defensive(Item.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true, projection : { __v: 0 } }));
	if(error) return errorRes(req, res, error, 500);
	return data ? successRes(req, res, data, 200) : notFound(req, res, 'Item not found.');
});

router.delete('/:id', async (req, res) => {
	const { error, data } = await defensive(Item.findByIdAndDelete(req.params.id));
	return error ? errorRes(req, res, error, 500) : successRes(req, res, data, 200);
});

module.exports = router;