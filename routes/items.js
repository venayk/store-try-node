const router = require('express').Router();

const Item = require('../models/items');
const defensive = require('../common/defensive');
const { successRes, errorRes } = require('../common/response');

router.get('/', async (req, res) => {
	const { error, data } = await defensive(Item.find({}));
	return error ? errorRes(req, res, error) : successRes(req, res, data, 200);
});

router.post('/', async (req, res) => {
	const { error, data } = await defensive(new Item({ ...req.body, createdOn: new Date() }).save());
	if(error) return errorRes(req, res, error, 500);
	return successRes(req, res, data._doc, 201);
});

router.get('/:id', async (req, res) => {
	const { error, data } = await defensive(Item.findById(req.params.id));
	return error ? errorRes(req, res, error, 500) : successRes(req, res, data, 200);
});

router.put('/:id', async (req, res) => {
	const { error, data } = await defensive(Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }));
	return error ? errorRes(req, res, error, 500): successRes(req, res, data, 200);
});

router.delete('/:id', async (req, res) => {
	const { error, data } = await defensive(Item.findByIdAndDelete(req.params.id));
	return error ? errorRes(req, res, error, 500) : successRes(req, res, data, 200);
});

module.exports = router;